using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class MensagemEntityConfiguration:IEntityTypeConfiguration<Mensagem>
    {
        public void Configure(EntityTypeBuilder<Mensagem> builder)
        {
            builder.HasKey(m => m.Id);
            builder.ToTable("mensagem");
            builder.Property(m => m.Texto).HasDefaultValue("");
            builder.Property(m => m.Id).ValueGeneratedNever();
        }
    }
}