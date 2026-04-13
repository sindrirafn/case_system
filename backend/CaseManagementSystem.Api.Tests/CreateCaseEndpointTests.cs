using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CaseManagementSystem.Api.Tests;

public class CreateCaseEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CreateCaseEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CreateCase_ShouldReturnCreated_WhenRequestIsValid()
    {
        var request = new
        {
            title = "Integration test case",
            description = "Created during integration testing.",
            status = "New",
            priority = "High",
            category = "Bug",
            customerId = 1,
            assignedUserId = 2,
            createdByUserId = 1,
            dueDate = DateTime.UtcNow.AddDays(2)
        };

        var response = await _client.PostAsJsonAsync("/api/cases", request);

        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }
}