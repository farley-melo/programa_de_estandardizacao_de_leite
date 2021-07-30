using System;
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
    public class DepositosService
    {
        private PelManualBackEndContext _context;
        
        public DepositosService(PelManualBackEndContext context)
        {
            this._context = context;
        }

        public Depositos SalvarDepositos(Depositos depositos)
        {
            Depositos depositoResult= this.BuscarDepositosPeloNome(depositos.Nome);

            if (depositoResult == null)
            {
                depositos.Analise = new Analise(){Gordura = 0,Snf = 0,Densidade = 0,Status = "Vazio"};
                this._context.Depositos.Add(depositos);
                this._context.SaveChanges();
                return depositos;
            }
            else
            {
                throw new DepositoExistenteException("Já existe um deposito com este nome");
            }
               
        }

        public Analise AtualizarAnalisesDoDeposito(string depositoNome,Analise analise)
        {
            Depositos depositoResult = this._context.Depositos.SingleOrDefault(d => d.Nome == depositoNome);
            if (depositoResult != null)
            {
                Analise analiseResult = this._context.Analises.SingleOrDefault(a => a.DepositoNome == depositoNome);
                analiseResult.Densidade = analise.Densidade;
                analiseResult.Gordura = analise.Gordura;
                analiseResult.Snf = analise.Snf;
                analiseResult.Status = analise.Status;
                this._context.SaveChanges();
                return analiseResult;

            }

            throw new DepositoNaoEncontradoException("Nao foi possivel atualizar deposito nao foi encotrado");
        }

        public List<Depositos> RetornarTodosDepositos()
        {
           return  this._context.Depositos.Include(d=>d.Analise).AsNoTracking().ToList();
        }

        public Depositos BuscarDepositosPeloNome(string nome)
        {
            Depositos depositos=this._context.Depositos.SingleOrDefault(d => d.Nome == nome);
            return depositos;
        }

        public Depositos RemoverDepositosPeloNome(string nomeDeposito)
        {
            var depositos = this._context.Depositos.FirstOrDefault(d => d.Nome == nomeDeposito);
            this._context.Depositos.Remove(depositos);
            this._context.SaveChanges();
            return depositos;
        }

        public Analise ObterAnaliseDoDeposito(string nomeDeposito)
        {
            Analise analise = this._context.Analises.FirstOrDefault(a => a.DepositoNome == nomeDeposito);
            if (analise != null)
            {
                return analise;
            }

            throw new DepositoNaoEncontradoException("As analises para este deposito nao foram encontradas");

        }

        public List<Analise> ObterDepositosComStatusUltilizando()
        {
            List<Analise> analises = this._context.Analises.ToList();
            List<Analise> analiseResult = analises.FindAll(analise => analise.Status == "Ultilizando");
            return analiseResult;

        }
        
    }
}