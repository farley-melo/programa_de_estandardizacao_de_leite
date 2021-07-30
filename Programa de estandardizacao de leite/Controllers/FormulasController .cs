using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using PelManualBackEnd.Models;
using PelManualBackEnd.Services;
using PelManualBackEnd.Services.ServicesExceptions;

namespace PelManualBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("politicaCors")]
    public class FormulasController : ControllerBase
    {
       

       private readonly ILogger<DepositosController> _logger;
        private readonly FormulaService _formulaService;
        private readonly IMemoryCache _memoryCache;

        public FormulasController(ILogger<DepositosController> logger,
            FormulaService formulaService,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._formulaService = formulaService;
            this._memoryCache = memoryCache;
        }
        
        [HttpPost]
        public  ActionResult<Depositos> SalvarFormula([FromBody] Formulas formula)
        {
            try
            {
                Formulas result = this._formulaService.SalvarFormula(formula);
                this._memoryCache.Remove("formulaCacheOne");
                this._memoryCache.Remove("formulaCacheMany");
                return Ok(result);
            }
            catch (FormulaExistenteException exception)
            {
                return Conflict(exception.Message);
            }
            
            
        }
        
        [HttpGet]
        public ActionResult<List<Formulas>> BuscarTodasFormulas()
        {
            var cacheEntry = this._memoryCache.GetOrCreate("formulaCacheMany", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                List<Formulas>todasFormulas = this._formulaService.RetornarTodasFormulas();
                return todasFormulas;
            });
            return Ok(cacheEntry);
        }
        
        [HttpGet("{gordura}")]
        public  ActionResult<Formulas>BuscarFormulaPelaGordura([FromRoute]double gordura)
        {
            var cacheEntry = this._memoryCache.GetOrCreate("formulaCacheOne", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                Formulas formula=  this._formulaService.BuscarFormulaPelaGordura(gordura);
                return formula;
            });
           
           return Ok(cacheEntry);
        }
       
        [HttpDelete("{gorduraFormula}")]
        public ActionResult<Depositos> RemoverFormula([FromRoute] double gorduraFormula)
        {
            this._memoryCache.Remove("formulaCacheOne");
            this._memoryCache.Remove("formulaCacheMany");
            return Ok(this._formulaService.RemoverFormulaPelaGordura(gorduraFormula));
        }
        
    }

       
    
}