using System;

namespace PelManualBackEnd.Services.ServicesExceptions
{
    public class FormulaExistenteException:Exception
    {
        public FormulaExistenteException(string mensage):base(mensage)
        {
            
        }
    }
}