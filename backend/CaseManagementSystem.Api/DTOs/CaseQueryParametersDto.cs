namespace CaseManagementSystem.Api.DTOs;

public class CaseQueryParametersDto
{
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public string? Category { get; set; }
    public int? AssignedUserId { get; set; }
    public string? Search { get; set; }
}