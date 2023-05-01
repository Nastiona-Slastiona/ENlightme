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
    private DbSet<Book> Books { get; set; }
    private DbSet<Card> Cards { get; set; }
    private DbSet<Notification> Notifications { get; set; }
    private DbSet<Interval> Intervals { get; set; }
    private DbSet<Language> Languages { get; set; }
    private DbSet<Genre> Genres { get; set; }

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

        modelBuilder.Entity<Book>()
            .HasOne(b => b.Genre)
            .WithMany()
            .HasForeignKey(b => b.GenreId);

        modelBuilder.Entity<Book>()
            .HasOne(b => b.Language)
            .WithMany()
            .HasForeignKey(b => b.LanguageId);

        modelBuilder.Entity<Card>()
            .HasOne(c => c.Language)
            .WithMany()
            .HasForeignKey(c => c.LanguageId);

        modelBuilder.Entity<Card>()
            .HasOne(c => c.Interval)
            .WithMany()
            .HasForeignKey(c => c.IntervalId);

        modelBuilder.Entity<Card>()
            .HasOne(c => c.Book)
            .WithMany(b => b.Cards)
            .HasForeignKey(c => c.BookId);
    }
}