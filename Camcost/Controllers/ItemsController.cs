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
    [Route("api/Items")]
    public class ItemsController : Controller
    {
        private readonly ItemContext _context;
        public static List<Item> filteredItems { get; set; }

        public ItemsController(ItemContext context)
        {
            _context = context;
            filteredItems = _context.Items.ToList();
        }

        // GET: api/Items
        [HttpGet]
        public PageViewModel GetItems()
        {
            PageViewModel page = new PageViewModel();
            page.TotalItems = _context.Items.Count();
            return page;
        }

        [HttpPost]
        [Route("Index")]
        public IEnumerable<Item> Index([FromBody] PageViewModel page)
        {

            int pageSize = (int)(page.PageSize / page.PageNumber);   // количество элементов на странице
            IEnumerable<Item> items;
            IEnumerable<Item> source = filteredItems;
            if (page.PageSize < page.TotalItems)
            {
                items = source.Take(page.PageSize).ToList();
            }
            else { items = source.ToList(); }


            return items;
        }

        [HttpPost]
        [Route("Search")]
        public IEnumerable<Item> Search([FromBody] List<string> parametres)
        {

            IQueryable<Item> source = _context.Items;
            var items = source.ToList();
            string gender;
            
            if (parametres.Count > 0)
            {
                if (parametres[0] != "3") { 
                    if(parametres[0] == "1") gender="male";
                    else  gender="female";
                    items = source.Where(item => item.Gender.ToString() == gender).ToList(); }

                if(parametres.Count>1) items = items.Where(item => item.Cathegory == parametres[1]).ToList();
                for (var i = 2; i < parametres.Count; i++)
                {
                    items = items.Where(item => item.Filters?.Contains(parametres[i]) is true).ToList();
                }



                if (items.ToList().Count == 0)
                {
                    filteredItems = new List<Item>();
                    return new List<Item>();
                }
                filteredItems = items;
            }
            return items.ToList();
        }
        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Items.SingleOrDefaultAsync(m => m.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem([FromRoute] Guid id, [FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        //// POST: api/Items
        [HttpPost]
        public async Task<IActionResult> PostItem([FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _context.Items.SingleOrDefaultAsync(m => m.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        private bool ItemExists(Guid id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}