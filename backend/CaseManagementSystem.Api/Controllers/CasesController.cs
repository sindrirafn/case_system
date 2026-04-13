using CaseManagementSystem.Api.Data;
using CaseManagementSystem.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CasesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<CaseListItemDto>>> GetCases([FromQuery] CaseQueryParametersDto query)
    {
        var casesQuery = _context.Cases
            .AsNoTracking()
            .Include(c => c.Customer)
            .Include(c => c.AssignedUser)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Status))
        {
            var status = query.Status.Trim().ToLower();
            casesQuery = casesQuery.Where(c => c.Status.ToLower() == status);
        }

        if (!string.IsNullOrWhiteSpace(query.Priority))
        {
            var priority = query.Priority.Trim().ToLower();
            casesQuery = casesQuery.Where(c => c.Priority.ToLower() == priority);
        }

        if (!string.IsNullOrWhiteSpace(query.Category))
        {
            var category = query.Category.Trim().ToLower();
            casesQuery = casesQuery.Where(c => c.Category.ToLower() == category);
        }

        if (query.AssignedUserId.HasValue)
        {
            casesQuery = casesQuery.Where(c => c.AssignedUserId == query.AssignedUserId.Value);
        }

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var searchTerm = query.Search.Trim().ToLower();

            casesQuery = casesQuery.Where(c =>
                c.Title.ToLower().Contains(searchTerm) ||
                c.Description.ToLower().Contains(searchTerm));
        }

        var cases = await casesQuery
            .OrderByDescending(c => c.UpdatedAt)
            .Select(c => new CaseListItemDto
            {
                Id = c.Id,
                Title = c.Title,
                Status = c.Status,
                Priority = c.Priority,
                Category = c.Category,
                CustomerName = c.Customer != null ? c.Customer.Name : "",
                AssignedUserName = c.AssignedUser != null
                    ? $"{c.AssignedUser.FirstName} {c.AssignedUser.LastName}"
                    : "",
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                DueDate = c.DueDate
            })
            .ToListAsync();

        return Ok(cases);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CaseDetailsDto>> GetCaseById(int id)
    {
        var caseItem = await _context.Cases
            .AsNoTracking()
            .Include(c => c.Customer)
            .Include(c => c.AssignedUser)
            .Include(c => c.CreatedByUser)
            .Include(c => c.Comments)
                .ThenInclude(comment => comment.User)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (caseItem == null)
        {
            return NotFound();
        }

        var result = new CaseDetailsDto
        {
            Id = caseItem.Id,
            Title = caseItem.Title,
            Description = caseItem.Description,
            Status = caseItem.Status,
            Priority = caseItem.Priority,
            Category = caseItem.Category,

            CustomerId = caseItem.CustomerId,
            CustomerName = caseItem.Customer?.Name ?? "",
            CustomerEmail = caseItem.Customer?.Email ?? "",
            CustomerCompanyName = caseItem.Customer?.CompanyName ?? "",
            CustomerPhoneNumber = caseItem.Customer?.PhoneNumber ?? "",

            AssignedUserId = caseItem.AssignedUserId,
            AssignedUserName = caseItem.AssignedUser != null
                ? $"{caseItem.AssignedUser.FirstName} {caseItem.AssignedUser.LastName}"
                : "",

            CreatedByUserId = caseItem.CreatedByUserId,
            CreatedByUserName = caseItem.CreatedByUser != null
                ? $"{caseItem.CreatedByUser.FirstName} {caseItem.CreatedByUser.LastName}"
                : "",

            CreatedAt = caseItem.CreatedAt,
            UpdatedAt = caseItem.UpdatedAt,
            DueDate = caseItem.DueDate,

            Comments = caseItem.Comments
                .OrderBy(comment => comment.CreatedAt)
                .Select(comment => new CaseCommentDto
                {
                    Id = comment.Id,
                    UserId = comment.UserId,
                    UserName = comment.User != null
                        ? $"{comment.User.FirstName} {comment.User.LastName}"
                        : "",
                    Content = comment.Content,
                    CreatedAt = comment.CreatedAt
                })
                .ToList()
        };

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CaseDetailsDto>> CreateCase(CreateCaseRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Title is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest("Description is required.");
        }

        var customerExists = await _context.Customers.AnyAsync(c => c.Id == request.CustomerId);
        if (!customerExists)
        {
            return BadRequest("Customer does not exist.");
        }

        var createdByUserExists = await _context.Users.AnyAsync(u => u.Id == request.CreatedByUserId);
        if (!createdByUserExists)
        {
            return BadRequest("CreatedByUser does not exist.");
        }

        if (request.AssignedUserId.HasValue)
        {
            var assignedUserExists = await _context.Users.AnyAsync(u => u.Id == request.AssignedUserId.Value);
            if (!assignedUserExists)
            {
                return BadRequest("Assigned user does not exist.");
            }
        }

        var caseItem = new Models.Case
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            Status = string.IsNullOrWhiteSpace(request.Status) ? "New" : request.Status.Trim(),
            Priority = string.IsNullOrWhiteSpace(request.Priority) ? "Medium" : request.Priority.Trim(),
            Category = string.IsNullOrWhiteSpace(request.Category) ? "Other" : request.Category.Trim(),
            CustomerId = request.CustomerId,
            AssignedUserId = request.AssignedUserId,
            CreatedByUserId = request.CreatedByUserId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            DueDate = request.DueDate
        };

        _context.Cases.Add(caseItem);
        await _context.SaveChangesAsync();

        var createdCase = await _context.Cases
            .AsNoTracking()
            .Include(c => c.Customer)
            .Include(c => c.AssignedUser)
            .Include(c => c.CreatedByUser)
            .Include(c => c.Comments)
                .ThenInclude(comment => comment.User)
            .FirstAsync(c => c.Id == caseItem.Id);

        var result = new CaseDetailsDto
        {
            Id = createdCase.Id,
            Title = createdCase.Title,
            Description = createdCase.Description,
            Status = createdCase.Status,
            Priority = createdCase.Priority,
            Category = createdCase.Category,

            CustomerId = createdCase.CustomerId,
            CustomerName = createdCase.Customer?.Name ?? "",
            CustomerEmail = createdCase.Customer?.Email ?? "",
            CustomerCompanyName = createdCase.Customer?.CompanyName ?? "",
            CustomerPhoneNumber = createdCase.Customer?.PhoneNumber ?? "",

            AssignedUserId = createdCase.AssignedUserId,
            AssignedUserName = createdCase.AssignedUser != null
                ? $"{createdCase.AssignedUser.FirstName} {createdCase.AssignedUser.LastName}"
                : "",

            CreatedByUserId = createdCase.CreatedByUserId,
            CreatedByUserName = createdCase.CreatedByUser != null
                ? $"{createdCase.CreatedByUser.FirstName} {createdCase.CreatedByUser.LastName}"
                : "",

            CreatedAt = createdCase.CreatedAt,
            UpdatedAt = createdCase.UpdatedAt,
            DueDate = createdCase.DueDate,

            Comments = new List<CaseCommentDto>()
        };

        return CreatedAtAction(nameof(GetCaseById), new { id = createdCase.Id }, result);
    }
    [HttpPut("{id:int}")]
    public async Task<ActionResult<CaseDetailsDto>> UpdateCase(int id, UpdateCaseRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest("Title is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            return BadRequest("Description is required.");
        }

        var caseItem = await _context.Cases.FirstOrDefaultAsync(c => c.Id == id);
        if (caseItem == null)
        {
            return NotFound();
        }

        var customerExists = await _context.Customers.AnyAsync(c => c.Id == request.CustomerId);
        if (!customerExists)
        {
            return BadRequest("Customer does not exist.");
        }

        if (request.AssignedUserId.HasValue)
        {
            var assignedUserExists = await _context.Users.AnyAsync(u => u.Id == request.AssignedUserId.Value);
            if (!assignedUserExists)
            {
                return BadRequest("Assigned user does not exist.");
            }
        }

        caseItem.Title = request.Title.Trim();
        caseItem.Description = request.Description.Trim();
        caseItem.Status = string.IsNullOrWhiteSpace(request.Status) ? caseItem.Status : request.Status.Trim();
        caseItem.Priority = string.IsNullOrWhiteSpace(request.Priority) ? caseItem.Priority : request.Priority.Trim();
        caseItem.Category = string.IsNullOrWhiteSpace(request.Category) ? caseItem.Category : request.Category.Trim();
        caseItem.CustomerId = request.CustomerId;
        caseItem.AssignedUserId = request.AssignedUserId;
        caseItem.DueDate = request.DueDate;
        caseItem.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var updatedCase = await _context.Cases
            .AsNoTracking()
            .Include(c => c.Customer)
            .Include(c => c.AssignedUser)
            .Include(c => c.CreatedByUser)
            .Include(c => c.Comments)
                .ThenInclude(comment => comment.User)
            .FirstAsync(c => c.Id == caseItem.Id);

        var result = new CaseDetailsDto
        {
            Id = updatedCase.Id,
            Title = updatedCase.Title,
            Description = updatedCase.Description,
            Status = updatedCase.Status,
            Priority = updatedCase.Priority,
            Category = updatedCase.Category,

            CustomerId = updatedCase.CustomerId,
            CustomerName = updatedCase.Customer?.Name ?? "",
            CustomerEmail = updatedCase.Customer?.Email ?? "",
            CustomerCompanyName = updatedCase.Customer?.CompanyName ?? "",
            CustomerPhoneNumber = updatedCase.Customer?.PhoneNumber ?? "",

            AssignedUserId = updatedCase.AssignedUserId,
            AssignedUserName = updatedCase.AssignedUser != null
                ? $"{updatedCase.AssignedUser.FirstName} {updatedCase.AssignedUser.LastName}"
                : "",

            CreatedByUserId = updatedCase.CreatedByUserId,
            CreatedByUserName = updatedCase.CreatedByUser != null
                ? $"{updatedCase.CreatedByUser.FirstName} {updatedCase.CreatedByUser.LastName}"
                : "",

            CreatedAt = updatedCase.CreatedAt,
            UpdatedAt = updatedCase.UpdatedAt,
            DueDate = updatedCase.DueDate,

            Comments = updatedCase.Comments
                .OrderBy(comment => comment.CreatedAt)
                .Select(comment => new CaseCommentDto
                {
                    Id = comment.Id,
                    UserId = comment.UserId,
                    UserName = comment.User != null
                        ? $"{comment.User.FirstName} {comment.User.LastName}"
                        : "",
                    Content = comment.Content,
                    CreatedAt = comment.CreatedAt
                })
                .ToList()
        };

        return Ok(result);
    }
}