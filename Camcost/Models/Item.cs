using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Camcost.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Cathegory { get; set; }
        
        
        [NotMapped]
        public virtual List<string> Subcathegories { get; set; }

        public string SubcathegoriesString
        {
            get { return string.Join(",", Subcathegories); }
            set { Subcathegories = value.Split(',').ToList(); }
        }

        [NotMapped]
        public virtual List<string> FilterValues { get; set; }

        public string FilterValuesString
        {
            get { return string.Join(",", FilterValues); }
            set { FilterValues = value.Split(',').ToList(); }
        }

        [NotMapped]
        public virtual List<string> FilterNames { get; set; }

        public string FilterNamesString
        {
            get { return string.Join(",", FilterNames); }
            set { FilterNames = value.Split(',').ToList(); }
        }
        public string Country { get; set; }
        public Gender Gender { get; set; }
        public string About { get; set; }
        public string Firm { get; set; }
        public byte[] Image { get; set; }
        public double Price { get; set; }
        public virtual IEnumerable<BuyItem> WasBought { get; set; } = new List<BuyItem>();

    }

    [Flags]
    public enum Gender
    {
        male = 0b01,
        female = 0b10,
        none = 0b00

    }

    public class ItemContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<BuyItem> BuyItems { get; set; }

        public ItemContext(DbContextOptions<ItemContext> options)
           : base(options)
        {
        }
    }
}
