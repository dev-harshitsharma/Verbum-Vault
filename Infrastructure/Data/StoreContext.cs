using Microsoft.EntityFrameworkCore;
using Core.Entities;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class StoreContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public StoreContext(DbContextOptions options)
            : base(options) { }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Book>()
                .HasOne(b => b.LentByUser)
                .WithMany(u => u.BooksLent)
                .HasForeignKey(b => b.LentByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<Book>()
                .HasOne(b => b.CurrentlyBorrowedByUser)
                .WithMany(u => u.BooksBorrowed)
                .HasForeignKey(b => b.CurrentlyBorrowedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AppUser>().Property(u => u.Id).ValueGeneratedOnAdd().IsRequired();

            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
