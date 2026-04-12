namespace CaseManagementSystem.Api.DTOs;

public class CaseCommentDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = "";
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}