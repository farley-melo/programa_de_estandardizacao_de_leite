using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context.EnititiesConfiguration
{
    public class TlEntityConfiguration:IEntityTypeConfiguration<Tl>
    {
        public void Configure(EntityTypeBuilder<Tl> builder)
        {
            builder.HasKey(tl => tl.Id);
            builder.ToTable("tl");
            builder.Property(tl => tl.Data).IsRequired();
            builder.Property(tl => tl.Tanque).IsRequired();
            builder.Property(tl => tl.Gordura).IsRequired();
            builder.Property(tl => tl.Snf).IsRequired();
            builder.Property(tl => tl.Crioscopia).IsRequired();
            builder.Property(tl => tl.Densidade).IsRequired();
            builder.Property(tl => tl.Acidez).IsRequired();
            builder.Property(tl => tl.NotaFiscal).IsRequired();
            builder.Property(tl => tl.Transportadora).IsRequired();
            builder.Property(tl => tl.CodigoCarreta).IsRequired();
            builder.Property(tl => tl.KilosRecebidos).IsRequired();
            builder.Property(tl => tl.MateriaPrima).IsRequired();
            builder.Property(tl => tl.CodigoMateriaPrima).IsRequired();
            builder.Property(tl => tl.Temperatura).IsRequired();
            builder.Property(tl => tl.Id).ValueGeneratedOnAdd();


        }
    }
}