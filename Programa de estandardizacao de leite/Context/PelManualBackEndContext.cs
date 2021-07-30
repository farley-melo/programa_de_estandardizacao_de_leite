using Microsoft.EntityFrameworkCore;
using PelManualBackEnd.Context.EnititiesConfiguration;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Context
{
    public class PelManualBackEndContext:DbContext
    {
        public DbSet<Depositos>Depositos { get; set; }
        public DbSet<Formulas>Formulas { get; set; }
        public DbSet<Tl>Tls { get; set; }
        
        public DbSet<Analise>Analises { get; set; }
        public DbSet<MateriasPrimas>MateriasPrimas{ get; set; }
        
        public DbSet<ResumoTl>ResumoTls { get; set; }

        public DbSet<Mensagem> Mensagens { get; set; }
        
        public PelManualBackEndContext(DbContextOptions options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new DepositoEntityConfiguration());
            modelBuilder.ApplyConfiguration(new FormulaEntityConfiguration());
            modelBuilder.ApplyConfiguration(new MateriasPrimasEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TlEntityConfiguration());
            modelBuilder.ApplyConfiguration(new AnaliseEntityConfiguration());
            modelBuilder.ApplyConfiguration(new MensagemEntityConfiguration());
        }
    }
}