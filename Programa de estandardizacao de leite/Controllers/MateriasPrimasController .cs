using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class MateriasPrimasController : ControllerBase
    {
       

       private readonly ILogger<MateriasPrimasController> _logger;
        private readonly MateriaPrimaService _materiaPrimaService;
        private readonly IMemoryCache _memoryCache;

        public MateriasPrimasController(ILogger<MateriasPrimasController> logger,
            MateriaPrimaService materiaPrimaService,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._materiaPrimaService = materiaPrimaService;
            this._memoryCache = memoryCache;
        }
        
        [HttpPost]
        public  ActionResult<MateriasPrimas> SalvarMateriaPrima([FromBody] MateriasPrimas materiasPrimas)
        {
            try
            {
                MateriasPrimas result = this._materiaPrimaService.SalvarMateriaPrima(materiasPrimas);
                this._memoryCache.Remove("materiaPrimaCacheOne");
                this._memoryCache.Remove("materiaPrimaCacheMany");
                return Ok(result);
            }
            catch (MateriaPrimaExistenteException exception)
            {
                return Conflict(exception.Message);
            }
            
            
        }
        
        [HttpGet]
        public ActionResult<List<MateriasPrimas>> BuscarTodasMateriasPrimas()
        {
            var cacheEntry = this._memoryCache.GetOrCreate("materiaPrimaCacheMany", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                List<MateriasPrimas>todasMateriasPrimas= this._materiaPrimaService.RetornarTodasMateriasPrimas();
                return todasMateriasPrimas;
            });
            return Ok(cacheEntry);
        }
        [HttpGet("{nome}")]
        public  ActionResult<MateriasPrimas>BuscarMateriaPrimaPeloNome([FromRoute]string nome)
        {
            var cacheEntry = this._memoryCache.GetOrCreate("materiaPrimaCacheOne", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                MateriasPrimas materiaPrima=  this._materiaPrimaService.BuscarMateriaPrimaPeloNome(nome);
                return materiaPrima;
            });
           
           return Ok(cacheEntry);
        }
       
        [HttpDelete("{id}")]
        public ActionResult<MateriasPrimas> RemoverMateriaPrima([FromRoute] long id)
        {
            this._memoryCache.Remove("materiaPrimaCacheOne");
            this._memoryCache.Remove("materiaPrimaCacheMany");
            return Ok(this._materiaPrimaService.RemoverMateriaPrimaPeloId(id));
        }

       
    }
}