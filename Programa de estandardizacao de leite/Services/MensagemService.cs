using System.Collections.Generic;
using System.Linq;
using PelManualBackEnd.Context;
using PelManualBackEnd.Models;

namespace Programa_de_estandardizacao_de_leite.Services
{
    public class MensagemService
    {
        private readonly PelManualBackEndContext _context;
        
        public MensagemService(PelManualBackEndContext context)
        {
            this._context = context;
        }

        public Mensagem salvarAtualizarMensagem(Mensagem mensagem)
        {
            Mensagem texto=this._context.Mensagens.FirstOrDefault(m => m.Id == mensagem.Id);
            if (texto == null)
            {
                this._context.Add(mensagem);
                this._context.SaveChanges();
            }
            else
            {
                texto.Texto = mensagem.Texto;
                this._context.SaveChanges();

            }

            return mensagem;
        }

        public Mensagem BuscarMensagem()
        {
           Mensagem mensagem= this._context.Mensagens.SingleOrDefault(m=>m.Id==1);
           if (mensagem == null)
           {
               return new Mensagem() {Id = 1, Texto = ""};
           }

           return mensagem;
        }
    }
}