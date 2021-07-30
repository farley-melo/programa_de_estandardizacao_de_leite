using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using PelManualBackEnd.Models;
using PelManualBackEnd.Services.ServicesExceptions;
using Programa_de_estandardizacao_de_leite.Services;

namespace PelManualBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("politicaCors")]
    public class TlController : ControllerBase
    {
        private readonly TlService _tlService;
        private readonly IMemoryCache _memoryCache;
        private readonly ResumoTlService _resumoTlService;

        public TlController(TlService tlService, IMemoryCache memoryCache,ResumoTlService resumoTlService)
        {
            this._tlService = tlService;
            this._memoryCache = memoryCache;
            this._resumoTlService = resumoTlService;
        }

        [HttpPost]
        public ActionResult<Tl> SalvarTl([FromBody] Tl tl)
        {
            try
            {
                Tl tlResult = this._tlService.SalvarTl(tl);
                this._memoryCache.Remove("tlCacheMany");
                this._memoryCache.Remove("buscarTlPorData");
                this._memoryCache.Remove("buscarTlPorNota");
                this._memoryCache.Remove("buscarTlPeloId");
                this._memoryCache.Remove("buscarTlsPeloTanque");
                return Ok(tlResult);
            }
            catch (NotaFiscalExistenteException exception)
            {
                return Conflict(exception.Message);
            }
            catch (TanqueNaoLiberadoException e)
            {
                return Conflict(e.Message);
            }
        }

        [HttpGet]
        public ActionResult<List<Tl>> BuscarTodosTls()
        {
            var cacheEntry = this._memoryCache.GetOrCreate("tlCacheMany", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                entry.SetPriority(CacheItemPriority.High);
                List<Tl> tls = this._tlService.BuscarTodosTls();
                return tls;
            });
            return Ok(cacheEntry);
        }

        [HttpGet("{data}")]
        public ActionResult<List<Tl>> BuscarTlPorData([FromRoute] string data)
        {
            List<Tl> tlResult;
            
            
            try
            {
                return tlResult = this._tlService.BuscarTLPorData(data);
            }
            catch (TlNaoEncontradoException ex)
            {
                return NotFound(ex.Message);
            }

            return Ok(tlResult);
        }

        [Route("[action]/{notaFiscal}")]
        [HttpGet]
        public ActionResult<Tl> BuscarTlPorNotaFiscal([FromRoute] string notaFiscal)
        {
            
                Tl tl = this._tlService.BuscarTlPeloNumeroDaNota(notaFiscal);
            
            
           
            if (tl == null)
            {
                return NotFound("Nenhum tl foi encontrado com esta nota fiscal");
            }

            return Ok(tl);
        }

        [Route("[action]/{id}")]
        [HttpGet]
        public ActionResult<Tl> BuscarTlPeloId([FromRoute] long id)
        {
            Tl cacheEntry;
            try
            {
                cacheEntry = this._memoryCache.GetOrCreate("buscarTlPeloId", entry =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                    entry.SetPriority(CacheItemPriority.High);
                    Tl tl = this._tlService.BuscarTlPeloId(id);
                    return tl;

                });
               
            }
            catch (TlNaoEncontradoException e)
            {
                return NotFound(e.Message);
            }
            return Ok(cacheEntry);
        }

        [Route("[action]/{tanque}")]
        [HttpGet]
        public ActionResult<List<Tl>> BuscarTlsPeloTanque([FromRoute] string tanque)
        {
            List<Tl> cacheEntry;
            try
            {
                cacheEntry = this._memoryCache.GetOrCreate("buscarTlsPeloTanque", entry =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                    entry.SetPriority(CacheItemPriority.High);
                    List<Tl>tlResult = this._tlService.BuscarTLPorDeposito(tanque);
                    return tlResult;

                });
               
            }
            catch (TlNaoEncontradoException ex)
            {
                return NotFound(ex.Message);
            }

            return Ok(cacheEntry);
        }
        
        [Route("[action]")]
        [HttpGet]
        public ActionResult<ResumoTl> ObterTodosResumosTl()
        {
            return Ok(this._tlService.ObterTodosResumosTl());
        }


        [HttpPut]
        public ActionResult<Tl> AtualizarTl([FromBody] Tl tl)
        {
            try
            {
                Tl tlResult = this._tlService.AtualizarTl(tl);
                this._memoryCache.Remove("tlCacheMany");
                this._memoryCache.Remove("buscarTlPorData");
                this._memoryCache.Remove("buscarTlPorNota");
                this._memoryCache.Remove("buscarTlPeloId");
                this._memoryCache.Remove("buscarTlsPeloTanque");
                return Ok(tlResult);
            }
            catch (TlNaoEncontradoException exception)
            {
                return NotFound(exception.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Tl> RemoverTl([FromRoute] long id)
        {
            Console.WriteLine(id);
            try
            {
                Tl tlRemovido = this._tlService.RemoverTl(id);
                this._memoryCache.Remove("tlCacheMany");
                this._memoryCache.Remove("buscarTlPorData");
                this._memoryCache.Remove("buscarTlPorNota");
                this._memoryCache.Remove("buscarTlPeloId");
                this._memoryCache.Remove("buscarTlsPeloTanque");
                return Ok(tlRemovido);
            }
            catch (TlNaoEncontradoException e)
            {
                return NotFound(e.Message);
            }
        }
        
        [Route("[action]/{nomeTanque}")]
        [HttpGet]
        public ActionResult<List<ResumoTl>>ObterResumoTlPeloNomeDoTanque(string nomeTanque)
        {
            return Ok(this._resumoTlService.BuscarResumoTlPeloNomeTanque(nomeTanque));
        }
    }
}