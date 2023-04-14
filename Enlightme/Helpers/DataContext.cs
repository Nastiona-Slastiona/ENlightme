using Enlightme.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enlightme.Helpers;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options):
        base(options)
    {
    }

    private DbSet<User> Users { get; set; }
    private DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<RefreshToken>()
            .HasKey(rf => rf.Id);

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany()
            .HasForeignKey(rt => rt.UserId);
    }
}