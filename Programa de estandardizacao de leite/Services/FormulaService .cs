using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PelManualBackEnd.Context;
using PelManualBackEnd.Models;
using PelManualBackEnd.Services.ServicesExceptions;

namespace PelManualBackEnd.Services
{
    public class FormulaService
    {
        private PelManualBackEndContext _context;
        
        public FormulaService(PelManualBackEndContext context)
        {
            this._context = context;
        }

        public Formulas SalvarFormula(Formulas formula)
        {
            this._context.Formulas.Add(formula);
            Formulas formulaResult= this.BuscarFormulaPelaGordura(formula.Gordura);

            if (formulaResult == null)
            {
                this._context.SaveChanges();
                return formula;
            }
            else
            {
                throw new FormulaExistenteException("Já existe uma formula com este nome");
            }
               
        }

        public List<Formulas> RetornarTodasFormulas()
        {
           return  this._context.Formulas.AsNoTracking().ToList();
        }

        public Formulas BuscarFormulaPelaGordura(double gordura)
        {
            return this._context.Formulas.SingleOrDefault(f => f.Gordura == gordura);
        }

        public Formulas RemoverFormulaPelaGordura(double gordura)
        {
            var formula = this._context.Formulas.FirstOrDefault(f => f.Gordura== gordura);
            this._context.Formulas.Remove(formula);
            this._context.SaveChanges();
            return formula;
        }
    }
}