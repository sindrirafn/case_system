namespace CaseManagementSystem.Api.DTOs;

public class UpdateCaseRequestDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Category { get; set; } = "";
    public int CustomerId { get; set; }
    public int? AssignedUserId { get; set; }
    public DateTime? DueDate { get; set; }
}