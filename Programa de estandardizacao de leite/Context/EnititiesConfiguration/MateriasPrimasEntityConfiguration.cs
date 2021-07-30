using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class MateriasPrimasEntityConfiguration:IEntityTypeConfiguration<MateriasPrimas>
    {
        public void Configure(EntityTypeBuilder<MateriasPrimas> builder)
        {
            builder.ToTable("materias_primas");
            builder.HasKey(mp => mp.Id);
            builder.Property(mp => mp.Codigo).HasDefaultValue("vazio");
            builder.Property(mp => mp.Procedencia).HasDefaultValue("vazio");
            builder.Property(mp => mp.Nome).HasDefaultValue("vazio");
            builder.Property(mp => mp.Descricao).HasDefaultValue("vazio");
            builder.Property(mp => mp.Id).ValueGeneratedOnAdd();
        }
    }
}