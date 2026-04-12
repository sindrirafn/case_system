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
    public async Task<ActionResult<List<CaseListItemDto>>> GetCases()
    {
        var cases = await _context.Cases
            .AsNoTracking()
            .Include(c => c.Customer)
            .Include(c => c.AssignedUser)
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
}