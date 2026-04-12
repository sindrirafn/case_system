namespace CaseManagementSystem.Api.DTOs;

public class CaseDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Category { get; set; } = "";

    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = "";
    public string CustomerEmail { get; set; } = "";
    public string CustomerCompanyName { get; set; } = "";
    public string CustomerPhoneNumber { get; set; } = "";

    public int? AssignedUserId { get; set; }
    public string AssignedUserName { get; set; } = "";

    public int CreatedByUserId { get; set; }
    public string CreatedByUserName { get; set; } = "";

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DueDate { get; set; }

    public List<CaseCommentDto> Comments { get; set; } = new();
}