using CaseManagementSystem.Api.Data;
using CaseManagementSystem.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .AsNoTracking()
            .OrderBy(u => u.FirstName)
            .ThenBy(u => u.LastName)
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                FullName = $"{u.FirstName} {u.LastName}",
                Email = u.Email,
                Role = u.Role,
                Team = u.Team
            })
            .ToListAsync();

        return Ok(users);
    }
}