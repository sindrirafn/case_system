namespace CaseManagementSystem.Api.Models;

public class Case
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public string Category { get; set; } = "Other";

    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }

    public int? AssignedUserId { get; set; }
    public User? AssignedUser { get; set; }

    public int CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }

    public List<Comment> Comments { get; set; } = new();
}