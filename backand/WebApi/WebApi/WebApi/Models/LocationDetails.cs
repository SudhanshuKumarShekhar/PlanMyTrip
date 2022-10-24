using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class LocationDetails
    {
        public long id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public Image Image { get; set; }

    }
}