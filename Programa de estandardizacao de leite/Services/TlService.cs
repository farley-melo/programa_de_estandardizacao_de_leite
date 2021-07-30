using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PelManualBackEnd.Context;
using PelManualBackEnd.Models;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class TlService
    {
        private readonly PelManualBackEndContext _context;

        public TlService(PelManualBackEndContext context)
        {
            this._context = context;
        }
        
        public Tl SalvarTl(Tl tl)
        {
            this._context.Tls.Add(tl);
            Tl tlResult= this.BuscarTlPeloNumeroDaNota(tl.NotaFiscal);

            if (tlResult == null)
            {
                Analise analise = this._context.Analises.FirstOrDefault(a => a.DepositoNome == tl.Tanque);
                if (analise != null)
                {
                    if (analise.Status == "Liberado para encher da recepção" || analise.Status == "Enchendo")
                    {
                        this._context.SaveChanges();
                        this.ResumirTl(tl.Tanque,tl.MateriaPrima,tl.KilosRecebidos,tl.CodigoMateriaPrima);
                        analise.Status = "Enchendo";
                        _context.SaveChanges();
                        
                    }
                    else
                    {
                        throw new TanqueNaoLiberadoException(
                            "Tanque nao liberado, peça para o operador de estardandização para  liberar o tanque para encher");
                    }
                   
                }
                return tl;
            }
            else
            {
                throw new NotaFiscalExistenteException("Não foi possivel salvar um tl com esse mesmo numero de nota fiscal ja foi cadastrado");
            }
               
        }
       //testar
        private void ResumirTl(string tanque, string nomeMateriaPrima, double quantidade,string codigo)
        {
            ResumoTl resumo = this._context.ResumoTls.FirstOrDefault(rt =>
                rt.NomeTanque == tanque && rt.NomeMateriaPrima == nomeMateriaPrima && rt.CodigoMateriaPrima==codigo);
            if (resumo == null)
            {
                resumo = new ResumoTl()
                    {NomeTanque = tanque,
                        NomeMateriaPrima = nomeMateriaPrima,
                        QuantidadeMateriaPrima = quantidade,
                        CodigoMateriaPrima = codigo,
                    };
                this._context.Add(resumo);
                this._context.SaveChanges();
            }
            else
            {
                resumo.QuantidadeMateriaPrima += quantidade;
                this._context.SaveChanges();
            }
        }

        public Tl BuscarTlPeloNumeroDaNota(string nota)
        {
            return this._context.Tls.FirstOrDefault(tl => tl.NotaFiscal== nota);
        }

        public List<Tl> BuscarTLPorData(string data)
        {
           List<Tl>dataFiltrada= _context.Tls.Where(tl => tl.Data == data).ToList();
           if (dataFiltrada.Count > 0)
           {
               return dataFiltrada;
           }

           throw new TlNaoEncontradoException("Nenhum tl foi encontrado nesta data");
        }

        public List<Tl> BuscarTLPorDeposito(string tanque)
        {
            List<Tl> depositos = this._context.Tls.Where(tl => tl.Tanque == tanque).ToList();
            if (depositos.Count > 0)
            {
                return depositos;
            }

            throw new TlNaoEncontradoException("Nenhum tl foi encontrado neste tanque");
        }

        public List<Tl> BuscarTodosTls()
        {
           return this._context.Tls.ToList();
        }

        public Tl BuscarTlPeloId(long id)
        {
           Tl tl=this._context.Tls.SingleOrDefault(tl => tl.Id == id);
           if (tl != null)
           {
               return tl;
           }

           throw new TlNaoEncontradoException("Tl não foi encontrado na base de dados");
        }

        public Tl AtualizarTl(Tl tl)
        {
            Tl result=this._context.Tls.SingleOrDefault(t => t.Id == tl.Id);
            if (result != null)
            {
                result.Data = tl.Data;
                result.Tanque = tl.Tanque;
                result.Gordura = tl.Gordura;
                result.Snf = tl.Snf;
                result.Crioscopia = tl.Crioscopia;
                result.Densidade = tl.Densidade;
                result.Acidez = tl.Acidez;
                result.NotaFiscal = tl.NotaFiscal;
                result.Transportadora = tl.Transportadora;
                result.CodigoCarreta = tl.CodigoCarreta;
                result.KilosRecebidos = tl.KilosRecebidos;
                result.MateriaPrima = tl.MateriaPrima;
                result.CodigoMateriaPrima = tl.CodigoMateriaPrima;
                result.Temperatura = tl.Temperatura;
                this._context.SaveChanges();
                return result;

            }

            throw new TlNaoEncontradoException("Tl nao foi encontrado");
        }

        public Tl RemoverTl(long id)
        {
           Tl tl= this._context.Tls.FirstOrDefault(tl => tl.Id == id);
           if (tl != null)
           {
               this._context.Tls.Remove(tl);
               ResumoTl resumoTl = this._context.ResumoTls.FirstOrDefault(rs =>
                   rs.NomeTanque == tl.Tanque && rs.NomeMateriaPrima == tl.MateriaPrima && rs.CodigoMateriaPrima==tl.CodigoMateriaPrima);
               if (resumoTl != null)
               {
                   resumoTl.QuantidadeMateriaPrima -= tl.KilosRecebidos;
                   if (resumoTl.QuantidadeMateriaPrima == 0)
                   {
                       Analise analise = this._context.Analises.FirstOrDefault(a => a.DepositoNome == tl.Tanque);
                       if (analise != null)
                       {
                           analise.Gordura = 0;
                           analise.Densidade = 0;
                           analise.Snf = 0;
                           analise.Status = "Vazio";
                           this._context.SaveChanges();
                       }
                       this._context.ResumoTls.Remove(resumoTl);
                       this._context.SaveChanges();
                   }
                   this._context.SaveChanges();
               }
               this._context.SaveChanges();
               return tl;
           }

           throw new TlNaoEncontradoException("Não foi possivel deletar este tl pois nao foi encontrado na nossa base de dados");
        }

        public List<ResumoTl> ObterTodosResumosTl()
        {
            return this._context.ResumoTls.ToList();
        }
    }
}