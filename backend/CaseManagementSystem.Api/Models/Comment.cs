namespace CaseManagementSystem.Api.Models;

public class Comment
{
    public int Id { get; set; }
    public int CaseId { get; set; }
    public Case? Case { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}