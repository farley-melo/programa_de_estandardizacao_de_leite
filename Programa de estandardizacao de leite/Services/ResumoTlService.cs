using System.Collections.Generic;
using System.Linq;
using PelManualBackEnd.Context;
using PelManualBackEnd.Models;

namespace Programa_de_estandardizacao_de_leite.Services
{
    public class ResumoTlService
    {
        private PelManualBackEndContext _context;
        
        public ResumoTlService(PelManualBackEndContext context)
        {
            this._context = context;
        }
        
        public List<ResumoTl> BuscarResumoTlPeloNomeTanque(string nomeTanque)
        {
            return this._context.ResumoTls.Where(rt => rt.NomeTanque == nomeTanque).ToList();
        }
    }
}