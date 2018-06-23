using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camcost.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Cathegory { get; set; }
        public string Filters { get; set; }
        public string FiltersNames { get; set; }

        public Gender Gender { get; set; }
        public string About { get; set; }
        public string Firm { get; set; }
        public byte[] Image { get; set; }
        public double Price { get; set; }

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
        public DbSet<Firm> Firms { get; set; }
        public ItemContext(DbContextOptions<ItemContext> options)
           : base(options)
        {
        }
    }
}
