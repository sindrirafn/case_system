using CaseManagementSystem.Api.Data;
using CaseManagementSystem.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryDto>> GetSummary([FromQuery] int? userId)
    {
        var sevenDaysAgo = DateTime.UtcNow.AddDays(-7);

        var openStatuses = new[] { "New", "InProgress", "WaitingForCustomer" };

        var totalOpenCases = await _context.Cases
            .AsNoTracking()
            .CountAsync(c => openStatuses.Contains(c.Status));

        var criticalCases = await _context.Cases
            .AsNoTracking()
            .CountAsync(c => openStatuses.Contains(c.Status) && c.Priority == "Critical");

        var casesAssignedToUser = 0;
        if (userId.HasValue)
        {
            casesAssignedToUser = await _context.Cases
                .AsNoTracking()
                .CountAsync(c => c.AssignedUserId == userId.Value && openStatuses.Contains(c.Status));
        }

        var resolvedLast7Days = await _context.Cases
            .AsNoTracking()
            .CountAsync(c => c.Status == "Resolved" && c.UpdatedAt >= sevenDaysAgo);

        var newLast7Days = await _context.Cases
            .AsNoTracking()
            .CountAsync(c => c.CreatedAt >= sevenDaysAgo);

        var overdueOpenCases = await _context.Cases
            .AsNoTracking()
            .CountAsync(c =>
                c.DueDate.HasValue &&
                c.DueDate.Value < DateTime.UtcNow &&
                openStatuses.Contains(c.Status));

        var result = new DashboardSummaryDto
        {
            TotalOpenCases = totalOpenCases,
            CriticalCases = criticalCases,
            CasesAssignedToUser = casesAssignedToUser,
            ResolvedLast7Days = resolvedLast7Days,
            NewLast7Days = newLast7Days,
            OverdueOpenCases = overdueOpenCases
        };

        return Ok(result);
    }
}