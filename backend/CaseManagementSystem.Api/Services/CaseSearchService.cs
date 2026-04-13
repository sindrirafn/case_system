namespace CaseManagementSystem.Api.Services;

public class CaseSearchService
{
    public bool MatchesSearch(string? title, string? description, string? search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return true;
        }

        var searchTerm = search.Trim().ToLower();

        var normalizedTitle = title?.ToLower() ?? string.Empty;
        var normalizedDescription = description?.ToLower() ?? string.Empty;

        return normalizedTitle.Contains(searchTerm) || normalizedDescription.Contains(searchTerm);
    }
}