using CaseManagementSystem.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace CaseManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DebugController : ControllerBase
{
    private readonly AppDbContext _context;

    public DebugController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("counts")]
    public IActionResult GetCounts()
    {
        return Ok(new
        {
            users = _context.Users.Count(),
            customers = _context.Customers.Count(),
            cases = _context.Cases.Count(),
            comments = _context.Comments.Count()
        });
    }
}