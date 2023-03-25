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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);
    }
}