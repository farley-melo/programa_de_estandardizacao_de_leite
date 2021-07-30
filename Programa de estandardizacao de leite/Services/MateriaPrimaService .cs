using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PelManualBackEnd.Context;
using PelManualBackEnd.Models;
using PelManualBackEnd.Services.ServicesExceptions;

namespace PelManualBackEnd.Services
{
    public class MateriaPrimaService
    {
        private PelManualBackEndContext _context;
        
        public MateriaPrimaService(PelManualBackEndContext context)
        {
            this._context = context;
        }

        public MateriasPrimas SalvarMateriaPrima(MateriasPrimas materiasPrimas)
        {
            MateriasPrimas materiasPrimasResult= this.BuscarMateriaPrimaPelaDescricao(materiasPrimas.Descricao);

            if (materiasPrimasResult == null)
            {
                this._context.MateriasPrimas.Add(materiasPrimas);
                this._context.SaveChanges();
                return materiasPrimas;
            }
            else
            {
                throw new MateriaPrimaExistenteException("Já existe uma materia prima com esse nome");
            }
               
        }

        public List<MateriasPrimas> RetornarTodasMateriasPrimas()
        {
           return  this._context.MateriasPrimas.AsNoTracking().ToList();
        }

        public MateriasPrimas BuscarMateriaPrimaPeloNome(string nome)
        {
            return this._context.MateriasPrimas.SingleOrDefault(mp => mp.Nome == nome);
        }

        public MateriasPrimas BuscarMateriaPrimaPeloCodigo(string codigo)
        {
            MateriasPrimas materiasPrimas = this._context.MateriasPrimas.SingleOrDefault(mp =>mp.Codigo==codigo );
            if (materiasPrimas !=null)
            {
                return materiasPrimas;
            }

            return null;
        }

        public MateriasPrimas BuscarMateriaPrimaPelaDescricao(string descricao)
        {
            MateriasPrimas materiasPrimas = this._context.MateriasPrimas.SingleOrDefault(mp =>mp.Descricao==descricao );
            if (materiasPrimas !=null)
            {
                return materiasPrimas;
            }

            return null;
        }

        public MateriasPrimas RemoverMateriaPrimaPeloId(long id)
        {
            var materiaPrima = this._context.MateriasPrimas.FirstOrDefault(mp => mp.Id == id);
            this._context.MateriasPrimas.Remove(materiaPrima);
            this._context.SaveChanges();
            return materiaPrima;
        }
    }
}