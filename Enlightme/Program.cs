using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddCors();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("EnlightmeDatabase")));
builder.Services.AddScoped<Repository<DataContext, User>>();
builder.Services.AddScoped<JwtHelper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(options => options
.WithOrigins(new[] { "http://localhost:8080" } )
.AllowAnyHeader()
.AllowAnyMethod()
.AllowCredentials());
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();