using CaseManagementSystem.Api.Services;
using FluentAssertions;

namespace CaseManagementSystem.Api.Tests;

public class CaseSearchServiceTests
{
    private readonly CaseSearchService _service = new();

    [Fact]
    public void MatchesSearch_ShouldReturnTrue_WhenSearchIsNull()
    {
        var result = _service.MatchesSearch("VPN login issue", "Customer cannot connect", null);

        result.Should().BeTrue();
    }

    [Fact]
    public void MatchesSearch_ShouldReturnTrue_WhenSearchIsWhitespace()
    {
        var result = _service.MatchesSearch("VPN login issue", "Customer cannot connect", "   ");

        result.Should().BeTrue();
    }

    [Fact]
    public void MatchesSearch_ShouldReturnTrue_WhenTitleContainsSearch()
    {
        var result = _service.MatchesSearch("VPN login issue", "Customer cannot connect", "vpn");

        result.Should().BeTrue();
    }

    [Fact]
    public void MatchesSearch_ShouldReturnTrue_WhenDescriptionContainsSearch()
    {
        var result = _service.MatchesSearch("Printer problem", "VPN credentials were reset", "credentials");

        result.Should().BeTrue();
    }

    [Fact]
    public void MatchesSearch_ShouldReturnFalse_WhenNeitherTitleNorDescriptionContainsSearch()
    {
        var result = _service.MatchesSearch("Printer problem", "Paper tray is empty", "vpn");

        result.Should().BeFalse();
    }

    [Fact]
    public void MatchesSearch_ShouldBeCaseInsensitive()
    {
        var result = _service.MatchesSearch("VPN Login Issue", "Customer cannot connect", "vpn");

        result.Should().BeTrue();
    }
}