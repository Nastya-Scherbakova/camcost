using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camcost.Models
{
    public class PageViewModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        
    }
}
