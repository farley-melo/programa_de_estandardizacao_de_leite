using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class DepositoEntityConfiguration:IEntityTypeConfiguration<Depositos>
    {
        public void Configure(EntityTypeBuilder<Depositos> builder)
        {
            builder.HasKey(d => d.Nome);
            builder.ToTable("depositos");
            builder.Property(d => d.Capacidade).HasDefaultValue(0);
            builder.HasOne(d => d.Analise)
                .WithOne(a => a.Depositos)
                .HasForeignKey<Analise>(a => a.DepositoNome).OnDelete(DeleteBehavior.Cascade);
        }
    }
}