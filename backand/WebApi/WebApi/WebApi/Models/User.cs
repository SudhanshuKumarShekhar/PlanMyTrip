using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class User
    {
        public long id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string Password { get; set; }
        public string confirmPassword { get; set; }
        public string mobile { get; set; }
        public string type { get; set; }

    }
}