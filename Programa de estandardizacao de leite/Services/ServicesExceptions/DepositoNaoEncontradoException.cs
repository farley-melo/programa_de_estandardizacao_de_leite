using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class DepositoNaoEncontradoException:Exception
    {
        public DepositoNaoEncontradoException(string message):base(message)
        {
            
        }
    }
}