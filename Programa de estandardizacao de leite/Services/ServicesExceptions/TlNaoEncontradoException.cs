using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class TlNaoEncontradoException:Exception
    {
        public TlNaoEncontradoException(string message):base(message)
        {
            
        }
    }
}