using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    [Serializable]
    public class DepositoExistenteException:Exception
    {
        public DepositoExistenteException(string mensagem):base(mensagem)
        {
            
        }
    }
}