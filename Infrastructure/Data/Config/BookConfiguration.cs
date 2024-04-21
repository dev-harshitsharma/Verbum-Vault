using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Author).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(200);
            builder.Property(p => p.Rating).HasColumnType("decimal(18,2)");
            builder.Property(p => p.Genre).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Author).IsRequired().HasMaxLength(100);
            builder.Property(p => p.IsBookAvailable).IsRequired().HasDefaultValue(true);
        }
    }
}
