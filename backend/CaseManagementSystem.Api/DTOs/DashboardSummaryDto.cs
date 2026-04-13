namespace CaseManagementSystem.Api.DTOs;

public class DashboardSummaryDto
{
    public int TotalOpenCases { get; set; }
    public int CriticalCases { get; set; }
    public int CasesAssignedToUser { get; set; }
    public int ResolvedLast7Days { get; set; }
    public int NewLast7Days { get; set; }
    public int OverdueOpenCases { get; set; }
}