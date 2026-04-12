namespace CaseManagementSystem.Api.DTOs;

public class CaseListItemDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Status { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Category { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public string AssignedUserName { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DueDate { get; set; }
}