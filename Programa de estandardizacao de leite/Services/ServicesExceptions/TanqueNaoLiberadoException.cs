using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class TanqueNaoLiberadoException:Exception
    {
        public TanqueNaoLiberadoException(string mensagem):base(mensagem)
        {
            
        }
        
    }
}