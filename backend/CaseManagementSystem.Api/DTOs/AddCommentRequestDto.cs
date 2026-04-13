namespace CaseManagementSystem.Api.DTOs;

public class AddCommentRequestDto
{
    public int UserId { get; set; }
    public string Content { get; set; } = "";
}