using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Camcost.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PayVariant { get; set; }
        public string DeliveryVariant { get; set; }
        public string TakeVariant { get; set; }
        public string Street { get; set; }
        public string House { get; set; }
        public string Room { get; set; }
        public string CityCtrl { get; set; }
        public string Postmail { get; set; }
        public string Comment { get; set; }
        public double Sum { get; set; }

        public string AdditionalInfo { get; set; }
        public bool IsDone { get; set; }


        public virtual IEnumerable<BuyItem> Items { get; set; }


    }
}
