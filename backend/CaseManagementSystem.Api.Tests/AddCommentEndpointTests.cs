using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CaseManagementSystem.Api.Tests;

public class AddCommentEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AddCommentEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task AddComment_ShouldReturnOk_WhenRequestIsValid()
    {
        var request = new
        {
            userId = 1,
            content = "Integration test comment."
        };

        var response = await _client.PostAsJsonAsync("/api/cases/1/comments", request);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}