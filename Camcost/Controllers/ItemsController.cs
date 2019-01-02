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
            filteredItems = _context.Items.AsNoTracking().ToList();
        }

        // GET: api/Items
        [HttpGet]
        public IEnumerable<Item> GetItems()
        {
            PageViewModel page = new PageViewModel();
            page.TotalItems = _context.Items.Count();
            page.PageNumber = 1;
            page.PageSize = 8;
            page.TotalPages = (int) (page.TotalItems/page.PageSize);
            return Index(page);
        }

        /// <summary>
        /// Index the filtered values for page view
        /// </summary>
        /// <returns>part of filtered array </returns>
        public IEnumerable<Item> Index(PageViewModel page)
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

        /// <summary>
        /// Search by the searchString after filtering the context
        /// </summary>
        /// <param name="searchString"> String for search </param>
        /// <returns> Method, that indexes for page view </returns>
        public IEnumerable<Item> Search(string searchString, PageViewModel page)
        {
            var result = new List<Item>();

            result.AddRange(filteredItems.Where(el=> el.About.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.Title.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.SubcathegoriesString.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.FilterValuesString.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.FilterNamesString.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.Firm.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.Country.ToUpper().Contains(searchString.ToUpper())));
            result.AddRange(filteredItems.Where(el=> el.Cathegory.ToUpper().Contains(searchString.ToUpper())));

            var distinctRes = new List<Item>();
            distinctRes.AddRange(result.Distinct());
            filteredItems = distinctRes;
            
            return Index(page);

        }

        /// <summary>
        /// Search by filters and search string
        /// </summary>
        /// <param name="parametres"> filters </param>
        /// <param name="searchString"> search words </param>
        /// <returns> Search by string or index filterd elements if search string is empty </returns>
        [HttpPost]
        [Route("Search/{searchString?}")]
        public async Task<IEnumerable<Item>> Search([FromBody] List<string> parametres, [FromRoute]string searchString = "", [FromRoute] int pageNumber = 0)
        {

            IQueryable<Item> source = _context.Items.AsNoTracking();
            var items = await source.ToListAsync();
            string gender;

            if (parametres.Count > 0)
            {
                if (parametres[0] != "3")
                {
                    if (parametres[0] == "1") gender = "male";
                    else gender = "female";
                    items = await source.Where(item => item.Gender.ToString() == gender).ToListAsync();
                }

                if (parametres.Count > 1) items = items.Where(item => item.Cathegory == parametres[1]).ToList();

                if (parametres.Count > 2)
                {
                    var result = new List<Item>();
                    for (var i = 2; i < parametres.Count; i++)
                    {
                        result.AddRange(items.Where(item => item.SubcathegoriesString?.Contains(parametres[i]) is true).ToList());
                    }

                    items = new List<Item>();
                    items.AddRange(result.Distinct());

                }


                if (items.ToList().Count == 0)
                {
                    filteredItems = new List<Item>();
                    return new List<Item>();
                }
                filteredItems = items;
            }
             var page = new PageViewModel()
            {
                PageNumber=pageNumber,
                PageSize=8*pageNumber,
                TotalItems=filteredItems.Count,
                TotalPages=(int)(filteredItems.Count/(8*pageNumber))
            };
            if (searchString.Length > 0)
            {
                return Search(searchString, page);
            }
            
            return Index(page);
        }
        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem([FromRoute] int id)
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
        public async Task<IActionResult> PutItem([FromRoute] int id, [FromBody] Item item)
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
        public async Task<IActionResult> DeleteItem([FromRoute] int id)
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

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}