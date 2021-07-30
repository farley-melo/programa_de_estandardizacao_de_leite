using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class NotaFiscalExistenteException:Exception
    {
        public NotaFiscalExistenteException(string message):base(message)
        {
            
        }
    }
}