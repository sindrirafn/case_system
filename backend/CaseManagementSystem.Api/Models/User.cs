namespace CaseManagementSystem.Api.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Role { get; set; } = "Agent";
    public string Team { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<Case> AssignedCases { get; set; } = new();
    public List<Case> CreatedCases { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
}