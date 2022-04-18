using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TranszInfo.Domain.Models
{
    public partial class MikroagressziContext : DbContext
    {
        public MikroagressziContext()
        {
        }

        public MikroagressziContext(DbContextOptions<MikroagressziContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Entry> Entries { get; set; }
        public virtual DbSet<Entryresource> Entryresources { get; set; }
        public virtual DbSet<Translation> Translations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasIndex(e => e.Id, "id")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasMaxLength(100)
                    .HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(2000)
                    .HasColumnName("description");

                entity.Property(e => e.Icon)
                    .HasMaxLength(100)
                    .HasColumnName("icon");

                entity.Property(e => e.LanguageCode)
                    .HasMaxLength(2)
                    .HasColumnName("language_code");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("name");

                entity.Property(e => e.Order).HasColumnName("order");
            });

            modelBuilder.Entity<Entry>(entity =>
            {
                entity.ToTable("entry");

                entity.HasIndex(e => e.Id, "id")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasMaxLength(100)
                    .HasColumnName("id");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("deleted_at");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("modified_at");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("title");

                entity.HasMany(d => d.Categories)
                    .WithMany(p => p.Entries)
                    .UsingEntity<Dictionary<string, object>>(
                        "Entrycategory",
                        l => l.HasOne<Category>().WithMany().HasForeignKey("Categoryid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("entrycategory_ibfk_1"),
                        r => r.HasOne<Entry>().WithMany().HasForeignKey("Entryid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("entrycategory_ibfk_2"),
                        j =>
                        {
                            j.HasKey("Entryid", "Categoryid").HasName("PRIMARY").HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                            j.ToTable("entrycategory");

                            j.HasIndex(new[] { "Categoryid" }, "categoryid");

                            j.HasIndex(new[] { "Entryid", "Categoryid" }, "entryid_categoryid").IsUnique();

                            j.IndexerProperty<string>("Entryid").HasMaxLength(100).HasColumnName("entryid");

                            j.IndexerProperty<string>("Categoryid").HasMaxLength(100).HasColumnName("categoryid");
                        });
            });

            modelBuilder.Entity<Entryresource>(entity =>
            {
                entity.HasKey(e => e.Resourceid)
                    .HasName("PRIMARY");

                entity.ToTable("entryresource");

                entity.HasIndex(e => e.Entryid, "entryid");

                entity.HasIndex(e => e.Resourceid, "resourceid")
                    .IsUnique();

                entity.Property(e => e.Resourceid)
                    .HasMaxLength(100)
                    .HasColumnName("resourceid");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("deleted_at");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.Entryid)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("entryid");

                entity.Property(e => e.Link)
                    .HasMaxLength(1000)
                    .HasColumnName("link");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("modified_at");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .HasColumnName("title");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("type");

                entity.HasOne(d => d.Entry)
                    .WithMany(p => p.Entryresources)
                    .HasForeignKey(d => d.Entryid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("entryresource_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
