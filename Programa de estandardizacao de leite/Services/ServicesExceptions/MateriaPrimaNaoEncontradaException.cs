using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class MateriaPrimaNaoEncontradaException :Exception
    {
        public MateriaPrimaNaoEncontradaException(string mensagem):base(mensagem)
        {
            
        }
    }
}