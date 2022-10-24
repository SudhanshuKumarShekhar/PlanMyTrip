using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class BookingDetails
    {
        public long id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Date { get; set; }
        public int Person { get; set; }
        public long LocationId { get; set; }
        public long logginUserId { get; set; }
        public int TotalPrice { get; set; }

    }
}