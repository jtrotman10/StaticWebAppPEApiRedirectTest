using System.Text;
using System.IO;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add CORS support for local development and Azure Static Web App
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable CORS
app.UseCors("AllowAll");

// Only use HTTPS redirection in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Simple test endpoint for Azure Static Web App API redirection
app.MapGet("/api/test", async (HttpContext context) =>
{
    var req = context.Request;

    // Capture headers
    var headers = req.Headers.ToDictionary(h => h.Key, h => h.Value.ToString());

    // Capture query params
    var query = req.Query.ToDictionary(q => q.Key, q => q.Value.ToString());

    // Capture cookies
    var cookies = req.Cookies.ToDictionary(c => c.Key, c => c.Value);

    // Read body (if any) safely
    string body = string.Empty;
    try
    {
        req.EnableBuffering();
        using var reader = new StreamReader(req.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true);
        body = await reader.ReadToEndAsync();
        req.Body.Position = 0;
    }
    catch
    {
        body = string.Empty;
    }

    var info = new
    {
        timestamp = DateTime.UtcNow,
        environment = app.Environment.EnvironmentName,
        request = new
        {
            method = req.Method,
            scheme = req.Scheme,
            host = req.Host.Value,
            path = req.Path.Value,
            pathBase = req.PathBase.Value,
            queryString = req.QueryString.Value,
            protocol = req.Protocol,
            contentType = req.ContentType,
            contentLength = req.ContentLength,
            remoteIp = context.Connection.RemoteIpAddress?.ToString(),
            headers,
            query,
            cookies,
            body
        }
    };

    return Results.Json(info);
})
.WithName("TestEndpoint");

app.Run();
