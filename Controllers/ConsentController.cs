using Microsoft.AspNetCore.Mvc;
using NetTask1.Models;
using NetTask1.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetTask1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConsentController : ControllerBase
    {
        private readonly ConsentService _consentService;

        public ConsentController(ConsentService consentService)
        {
            _consentService = consentService;
        }

        [HttpGet]
        public ActionResult<List<Consent>> Get() =>
            _consentService.Get();

        [HttpGet("{id:length(24)}")]
        public ActionResult<Consent> Get(string id)
        {
            var consent = _consentService.Get(id);

            if (consent == null)
            {
                return NotFound();
            }

            return consent;
        }

        [HttpGet("stats")]
        public async Task<List<ConsentStats>> GetStats()
        {
            var stats = await _consentService.GetStatsAsync();

            return stats;
        }

        [HttpPost]
        public ActionResult<Consent> Create(Consent consent)
        {
            _consentService.Create(consent);

            return consent;
        }

        [HttpPut]
        public ActionResult<Consent> Update(Consent consent)
        {
            var existingConsent = _consentService.Get(consent.Id);

            if (existingConsent == null)
            {
                return NotFound();
            }

            _consentService.Update(consent.Id, consent);

            return consent;
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _consentService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _consentService.Remove(book.Id);

            return NoContent();
        }
    }
}
