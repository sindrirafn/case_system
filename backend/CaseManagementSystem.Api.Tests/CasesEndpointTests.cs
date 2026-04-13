using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CaseManagementSystem.Api.Tests;

public class CasesEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CasesEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetCases_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/cases");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}