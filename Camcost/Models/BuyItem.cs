using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camcost.Models
{
    public class BuyItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }                
        public int Count { get; set; }

    }

   
}
