using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PelManualBackEnd.Models;
using Programa_de_estandardizacao_de_leite.Services;

namespace PelManualBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("politicaCors")]
    
    public class MensagemController : ControllerBase
    {
        private readonly MensagemService _mensagemService;

        public MensagemController(MensagemService mensagemService)
        {
            this._mensagemService = mensagemService;
        }

        [HttpPost]
        public ActionResult<Mensagem> SalvarOuAtualizarMensagem([FromBody] Mensagem mensagem)
        {
            return Ok(this._mensagemService.salvarAtualizarMensagem(mensagem));
        }
        
        [HttpGet]
        public ActionResult<Mensagem> BuscarMensagem()
        {
            return Ok(this._mensagemService.BuscarMensagem());
        }
    }
}