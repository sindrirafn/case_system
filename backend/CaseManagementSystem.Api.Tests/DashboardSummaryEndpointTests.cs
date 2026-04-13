using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CaseManagementSystem.Api.Tests;

public class DashboardSummaryEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public DashboardSummaryEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetDashboardSummary_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/dashboard/summary?userId=1");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}