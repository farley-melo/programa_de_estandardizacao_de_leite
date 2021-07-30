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
    public class DepositosController : ControllerBase
    {
       

        private readonly ILogger<DepositosController> _logger;
        private readonly DepositosService _depositosService;
        private readonly IMemoryCache _memoryCache;

        public DepositosController(ILogger<DepositosController> logger,
            DepositosService depositosService,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._depositosService = depositosService;
            this._memoryCache = memoryCache;
        }
        
        [HttpPost]
        public  ActionResult<Depositos> SalvarDeposito([FromBody] Depositos deposito)
        {
            try
            {
                Depositos result = this._depositosService.SalvarDepositos(deposito);
                this._memoryCache.Remove("depositoCacheOne");
                this._memoryCache.Remove("depositoCacheMany");
                this._memoryCache.Remove("analiseDeposito");
                return Ok(result);
            }
            catch (DepositoExistenteException exception)
            {
                return Conflict(exception.Message);
            }
            
            
        }
        
        [HttpGet]
        public ActionResult<List<Depositos>> BuscarTodosDepositos()
        {
            var cacheEntry = this._memoryCache.GetOrCreate("depositoCacheMany", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                List<Depositos>todosDepositos = this._depositosService.RetornarTodosDepositos();
                return todosDepositos;
            });
            return Ok(cacheEntry);
        }
        [HttpGet("{nome}")]
        public  ActionResult<Depositos>BuscarDepositoPeloNome([FromRoute]string nome)
        {
            var cacheEntry = this._memoryCache.GetOrCreate("depositoCacheOne", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                Depositos deposito=  this._depositosService.BuscarDepositosPeloNome(nome);
                return deposito;
            });
           
           return Ok(cacheEntry);
        }
       
        [HttpDelete("{nomeDeposito}")]
        public ActionResult<Depositos> RemoverDeposito([FromRoute] string nomeDeposito)
        {
            this._memoryCache.Remove("depositoCacheOne");
           
            this._memoryCache.Remove("depositoCacheMany");
            this._memoryCache.Remove("analiseDeposito");
            return Ok(this._depositosService.RemoverDepositosPeloNome(nomeDeposito));
        }
        
        [HttpPut("{nomeDeposito}")]
        public ActionResult<Depositos> AtualizarAnalisesDoDeposito([FromRoute]string nomeDeposito,[FromBody]Analise analise)
        {
            try
            {
                Analise analiseResult = this._depositosService.AtualizarAnalisesDoDeposito(nomeDeposito, analise);
                this._memoryCache.Remove("depositoCacheOne");
                this._memoryCache.Remove("depositoCacheMany");
                this._memoryCache.Remove("analiseDeposito");
                return Ok(analiseResult);
            }
            catch (DepositoNaoEncontradoException e)
            {
                return NotFound(e.Message);
            }
        }
        
        [Route("[action]/{depositoNome}")]
        [HttpGet]
        public ActionResult<Analise> ObterAnaliseDoDeposito([FromRoute]string depositoNome)
        {
            try
            {
                return Ok(this._depositosService.ObterAnaliseDoDeposito(depositoNome));
            }
            catch (DepositoNaoEncontradoException e)
            {
                return NotFound(e.Message);
            }
            
        }
        
        [Route("[action]")]
        [HttpGet]
        public ActionResult<List<Analise>> ObterDepositosQueEstaoSendoUltilizados()
        {
            return Ok(this._depositosService.ObterDepositosComStatusUltilizando());
        }
        
        
        
        
    }
}