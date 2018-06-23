using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Camcost.Models;

namespace Camcost.Controllers
{
    [Produces("application/json")]
    [Route("api/Firms")]
    public class FirmsController : Controller
    {
        private readonly ItemContext _context;

        public FirmsController(ItemContext context)
        {
            _context = context;
        }

        // GET: api/Firms
        [HttpGet]
        public IEnumerable<Firm> GetFirms()
        {
            return _context.Firms;
        }

        // GET: api/Firms/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFirm([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var firm = await _context.Firms.SingleOrDefaultAsync(m => m.Id == id);

            if (firm == null)
            {
                return NotFound();
            }

            return Ok(firm);
        }

        // PUT: api/Firms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFirm([FromRoute] Guid id, [FromBody] Firm firm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != firm.Id)
            {
                return BadRequest();
            }

            _context.Entry(firm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FirmExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Firms
        [HttpPost]
        public async Task<IActionResult> PostFirm([FromBody] Firm firm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Firms.Add(firm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFirm", new { id = firm.Id }, firm);
        }

        // DELETE: api/Firms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFirm([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var firm = await _context.Firms.SingleOrDefaultAsync(m => m.Id == id);
            if (firm == null)
            {
                return NotFound();
            }

            _context.Firms.Remove(firm);
            await _context.SaveChangesAsync();

            return Ok(firm);
        }

        private bool FirmExists(Guid id)
        {
            return _context.Firms.Any(e => e.Id == id);
        }
    }
}