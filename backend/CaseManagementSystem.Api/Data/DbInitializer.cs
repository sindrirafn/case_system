using CaseManagementSystem.Api.Models;
using CaseManagementSystem.Api.Services;

namespace CaseManagementSystem.Api.Data;



public static class DbInitializer
{
    private static readonly Random _random = new();
    public static void Seed(AppDbContext context, PasswordService passwordService)
    {
        if (context.Users.Any() || context.Customers.Any() || context.Cases.Any() || context.Comments.Any())
        {
            return;
        }

        var users = new List<User>
        {
            new()
            {
                FirstName = "Sindri",
                LastName = "Admin",
                Email = "sindri.admin@casevia.local",
                PasswordHash = passwordService.HashPassword("Password123!"),
                Role = "Admin",
                Team = "Operations"
            },
            new()
            {
                FirstName = "Anna",
                LastName = "Jonsdottir",
                Email = "anna.jonsdottir@casevia.local",
                PasswordHash = passwordService.HashPassword("Password123!"),
                Role = "Agent",
                Team = "Support"
            },
            new()
            {
                FirstName = "Bjorn",
                LastName = "Sigurdsson",
                Email = "bjorn.sigurdsson@casevia.local",
                PasswordHash = passwordService.HashPassword("Password123!"),
                Role = "Agent",
                Team = "Support"
            },
            new()
            {
                FirstName = "Elin",
                LastName = "Gunnarsdottir",
                Email = "elin.gunnarsdottir@casevia.local",
                PasswordHash = passwordService.HashPassword("Password123!"),
                Role = "Agent",
                Team = "Infrastructure"
            },
            new()
            {
                FirstName = "Klara",
                LastName = "Manager",
                Email = "klara.manager@casevia.local",
                PasswordHash = passwordService.HashPassword("Password123!"),
                Role = "Viewer",
                Team = "Management"
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();

        var customers = new List<Customer>
        {
            new()
            {
                Name = "Jon Gudmundsson",
                Email = "jon.gudmundsson@northtrade.is",
                CompanyName = "NorthTrade",
                PhoneNumber = "555-1001"
            },
            new()
            {
                Name = "Sara Olafsdottir",
                Email = "sara.olafsdottir@icebank.is",
                CompanyName = "IceBank",
                PhoneNumber = "555-1002"
            },
            new()
            {
                Name = "Daniel Hansen",
                Email = "daniel.hansen@cityservices.is",
                CompanyName = "City Services",
                PhoneNumber = "555-1003"
            },
            new()
            {
                Name = "Kristin Magnusdottir",
                Email = "kristin.magnusdottir@harborlogistics.is",
                CompanyName = "Harbor Logistics",
                PhoneNumber = "555-1004"
            },
            new()
            {
                Name = "Aron Eiriksson",
                Email = "aron.eiriksson@fjordtech.is",
                CompanyName = "FjordTech",
                PhoneNumber = "555-1005"
            },
            new()
            {
                Name = "Eva Petersen",
                Email = "eva.petersen@nordicretail.is",
                CompanyName = "Nordic Retail",
                PhoneNumber = "555-1006"
            }
        };

        context.Customers.AddRange(customers);
        context.SaveChanges();

        // var cases = new List<Case>
        // {
        //     new()
        //     {
        //         Title = "User cannot access SharePoint team site",
        //         Description = "User reports access denied after permissions were updated during a migration.",
        //         Status = "New",
        //         Priority = "High",
        //         Category = "Permissions",
        //         CustomerId = customers[0].Id,
        //         AssignedUserId = users[1].Id,
        //         CreatedByUserId = users[0].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-2),
        //         UpdatedAt = DateTime.UtcNow.AddDays(-2),
        //         DueDate = DateTime.UtcNow.AddDays(2)
        //     },
        //     new()
        //     {
        //         Title = "VPN login fails after password reset",
        //         Description = "Customer can log into email but VPN rejects the same credentials.",
        //         Status = "InProgress",
        //         Priority = "High",
        //         Category = "Access",
        //         CustomerId = customers[1].Id,
        //         AssignedUserId = users[2].Id,
        //         CreatedByUserId = users[0].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-3),
        //         UpdatedAt = DateTime.UtcNow.AddDays(-1),
        //         DueDate = DateTime.UtcNow.AddDays(1)
        //     },
        //     new()
        //     {
        //         Title = "Printer offline on second floor",
        //         Description = "Office printer shows as offline for all users in the finance department.",
        //         Status = "WaitingForCustomer",
        //         Priority = "Medium",
        //         Category = "Hardware",
        //         CustomerId = customers[2].Id,
        //         AssignedUserId = users[3].Id,
        //         CreatedByUserId = users[1].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-5),
        //         UpdatedAt = DateTime.UtcNow.AddDays(-1),
        //         DueDate = DateTime.UtcNow.AddDays(3)
        //     },
        //     new()
        //     {
        //         Title = "Permissions not applied to shared mailbox",
        //         Description = "New staff member still cannot open the mailbox after being added to the access group.",
        //         Status = "Resolved",
        //         Priority = "Medium",
        //         Category = "Permissions",
        //         CustomerId = customers[3].Id,
        //         AssignedUserId = users[1].Id,
        //         CreatedByUserId = users[2].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-7),
        //         UpdatedAt = DateTime.UtcNow.AddHours(-18),
        //         DueDate = DateTime.UtcNow.AddDays(-1)
        //     },
        //     new()
        //     {
        //         Title = "Accounting application crashes on startup",
        //         Description = "Application closes immediately after launch on multiple machines.",
        //         Status = "InProgress",
        //         Priority = "Critical",
        //         Category = "Software",
        //         CustomerId = customers[4].Id,
        //         AssignedUserId = users[3].Id,
        //         CreatedByUserId = users[0].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-1),
        //         UpdatedAt = DateTime.UtcNow.AddHours(-6),
        //         DueDate = DateTime.UtcNow.AddHours(12)
        //     },
        //     new()
        //     {
        //         Title = "New employee account creation request",
        //         Description = "Request to prepare account, email, and group memberships for a new employee starting Monday.",
        //         Status = "New",
        //         Priority = "Low",
        //         Category = "Account",
        //         CustomerId = customers[5].Id,
        //         AssignedUserId = users[2].Id,
        //         CreatedByUserId = users[1].Id,
        //         CreatedAt = DateTime.UtcNow.AddHours(-10),
        //         UpdatedAt = DateTime.UtcNow.AddHours(-10),
        //         DueDate = DateTime.UtcNow.AddDays(4)
        //     },
        //     new()
        //     {
        //         Title = "Intermittent Wi-Fi dropouts in meeting rooms",
        //         Description = "Multiple users report unstable wireless connectivity during meetings.",
        //         Status = "Closed",
        //         Priority = "Medium",
        //         Category = "Hardware",
        //         CustomerId = customers[2].Id,
        //         AssignedUserId = users[3].Id,
        //         CreatedByUserId = users[1].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-12),
        //         UpdatedAt = DateTime.UtcNow.AddDays(-4),
        //         DueDate = DateTime.UtcNow.AddDays(-8)
        //     },
        //     new()
        //     {
        //         Title = "CRM export produces empty file",
        //         Description = "Export completes without error, but generated file contains no rows.",
        //         Status = "InProgress",
        //         Priority = "High",
        //         Category = "Bug",
        //         CustomerId = customers[4].Id,
        //         AssignedUserId = users[1].Id,
        //         CreatedByUserId = users[0].Id,
        //         CreatedAt = DateTime.UtcNow.AddDays(-2),
        //         UpdatedAt = DateTime.UtcNow.AddHours(-3),
        //         DueDate = DateTime.UtcNow.AddDays(2)
        //     }
        // };

        // context.Cases.AddRange(cases);
        // context.SaveChanges();
        var statuses = new[] { "New", "InProgress", "WaitingForCustomer", "Resolved", "Closed" };
        var priorities = new[] { "Low", "Medium", "High", "Critical" };
        var categories = new[] { "Access", "Permissions", "Bug", "Hardware", "Software", "Account", "Other" };

        var caseTitles = new[]
        {
    "User cannot access SharePoint site",
    "VPN connection fails intermittently",
    "Email permissions not applied",
    "Application crashes on startup",
    "Printer not responding",
    "User locked out of account",
    "Data export produces empty file",
    "Slow system performance reported",
    "File access denied unexpectedly",
    "New employee onboarding request"
};

        var caseDescriptions = new[]
        {
    "Issue started occurring after recent update.",
    "Problem appears intermittent and hard to reproduce.",
    "Customer reports this affects multiple users.",
    "Initial investigation points to configuration issue.",
    "Issue has been escalated internally.",
    "Waiting for additional information from customer.",
    "Reproduced in test environment.",
    "Seems related to permission misconfiguration."
};

        var cases = new List<Case>();

        int caseCount = 60;

        for (int i = 0; i < caseCount; i++)
        {
            var createdAt = DateTime.UtcNow.AddDays(-_random.Next(1, 30)).AddHours(-_random.Next(0, 24));

            var status = statuses[_random.Next(statuses.Length)];
            var priority = priorities[_random.Next(priorities.Length)];

            var assignedUser = users[_random.Next(1, users.Count)]; // skip admin for realism
            var createdBy = users[_random.Next(users.Count)];
            var customer = customers[_random.Next(customers.Count)];

            var updatedAt = createdAt.AddHours(_random.Next(1, 72));

            var caseItem = new Case
            {
                Title = caseTitles[_random.Next(caseTitles.Length)],
                Description = caseDescriptions[_random.Next(caseDescriptions.Length)],
                Status = status,
                Priority = priority,
                Category = categories[_random.Next(categories.Length)],
                CustomerId = customer.Id,
                AssignedUserId = assignedUser.Id,
                CreatedByUserId = createdBy.Id,
                CreatedAt = createdAt,
                UpdatedAt = updatedAt,
                DueDate = createdAt.AddDays(_random.Next(1, 10))
            };

            cases.Add(caseItem);
        }

        context.Cases.AddRange(cases);
        context.SaveChanges();

        //     var comments = new List<Comment>

        //     {
        //         new()
        //         {
        //             CaseId = cases[0].Id,
        //             UserId = users[1].Id,
        //             Content = "Started investigating current site permissions and group membership.",
        //             CreatedAt = DateTime.UtcNow.AddDays(-2).AddHours(2)
        //         },
        //         new()
        //         {
        //             CaseId = cases[1].Id,
        //             UserId = users[2].Id,
        //             Content = "Confirmed VPN profile is still using old cached credentials.",
        //             CreatedAt = DateTime.UtcNow.AddDays(-2)
        //         },
        //         new()
        //         {
        //             CaseId = cases[1].Id,
        //             UserId = users[2].Id,
        //             Content = "Waiting for customer to confirm whether issue persists after clearing cached login.",
        //             CreatedAt = DateTime.UtcNow.AddDays(-1)
        //         },
        //         new()
        //         {
        //             CaseId = cases[2].Id,
        //             UserId = users[3].Id,
        //             Content = "Asked customer to verify whether printer has been restarted on-site.",
        //             CreatedAt = DateTime.UtcNow.AddDays(-1)
        //         },
        //         new()
        //         {
        //             CaseId = cases[3].Id,
        //             UserId = users[1].Id,
        //             Content = "Mailbox opened successfully after forcing permission sync. Ready for closure.",
        //             CreatedAt = DateTime.UtcNow.AddHours(-18)
        //         },
        //         new()
        //         {
        //             CaseId = cases[4].Id,
        //             UserId = users[3].Id,
        //             Content = "Crash reproduced on test machine. Investigating latest client update.",
        //             CreatedAt = DateTime.UtcNow.AddHours(-6)
        //         },
        //         new()
        //         {
        //             CaseId = cases[7].Id,
        //             UserId = users[1].Id,
        //             Content = "Issue appears related to a filter being incorrectly applied before export generation.",
        //             CreatedAt = DateTime.UtcNow.AddHours(-3)
        //         }
        //     };

        //     context.Comments.AddRange(comments);
        //     context.SaveChanges();
        var commentTemplates = new[]
    {
    "Investigating issue.",
    "Contacted user for more details.",
    "Issue reproduced locally.",
    "Working on a fix.",
    "Awaiting customer response.",
    "Resolved in test environment.",
    "Deployed fix, monitoring results.",
    "Escalated to senior team."
};

        var comments = new List<Comment>();

        foreach (var c in cases)
        {
            int commentCount = _random.Next(0, 5);

            for (int i = 0; i < commentCount; i++)
            {
                var commentTime = c.CreatedAt.AddHours(_random.Next(1, 72));

                comments.Add(new Comment
                {
                    CaseId = c.Id,
                    UserId = users[_random.Next(users.Count)].Id,
                    Content = commentTemplates[_random.Next(commentTemplates.Length)],
                    CreatedAt = commentTime
                });
            }
        }

        context.Comments.AddRange(comments);
        context.SaveChanges();
    }
}