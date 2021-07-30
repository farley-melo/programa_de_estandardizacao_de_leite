using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class FormulaEntityConfiguration:IEntityTypeConfiguration<Formulas>
    {
        public void Configure(EntityTypeBuilder<Formulas> builder)
        {
            builder.ToTable("formulas");
            builder.HasKey(f => f.Id);
            builder.Property(f => f.FatorAcucarObj).HasDefaultValue(0.0);
            builder.Property(f => f.FatorAcucarMin).HasDefaultValue(0.0);
            builder.Property(f => f.FatorAcucarMax).HasDefaultValue(0.0);
            builder.Property(f => f.RfObj).HasDefaultValue(0.0);
            builder.Property(f => f.RfMin).HasDefaultValue(0.0);
            builder.Property(f => f.RfMax).HasDefaultValue(0.0);
            builder.Property(f => f.Gordura).HasDefaultValue(0.0);
            builder.Property(f => f.Id).ValueGeneratedOnAdd();
        }
    }
}