using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class AnaliseEntityConfiguration:IEntityTypeConfiguration<Analise>
    {
        public void Configure(EntityTypeBuilder<Analise> builder)
        {
            builder.ToTable("analise");
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Id).ValueGeneratedOnAdd();
            builder.Property(a => a.Densidade).HasDefaultValue(0);
            builder.Property(a => a.Gordura).HasDefaultValue(0);
            builder.Property(a => a.Snf).HasDefaultValue(0);
        }
    }
}