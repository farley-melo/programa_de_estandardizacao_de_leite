using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class MateriaPrimaExistenteException:Exception
    {
        public MateriaPrimaExistenteException(string message) : base(message)
        {
            
        }
    }
}