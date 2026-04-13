namespace CaseManagementSystem.Api.DTOs;

public class CreateCaseRequestDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public string Category { get; set; } = "Other";
    public int CustomerId { get; set; }
    public int? AssignedUserId { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? DueDate { get; set; }
}