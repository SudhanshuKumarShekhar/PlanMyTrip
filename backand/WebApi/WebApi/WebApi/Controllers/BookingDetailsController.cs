using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;

namespace WebApi.Controllers
{
    public class BookingDetailsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select b.id, t.Name, t.Address, b.Name,b.Mobile,b.Date,b.Person,b.TotalPrice from dbo.BookingDetails b
join dbo.TripDetails t  on t.id = b.LocationId";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public HttpResponseMessage Get(int id)
        {
            DataTable table = new DataTable();
            string query = @"select b.id, t.Name, t.Address, b.Name,b.Mobile,b.Date,b.Person,b.TotalPrice from dbo.BookingDetails b
join dbo.TripDetails t  on t.id = b.LocationId where b.logginUserId= " + id;
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(BookingDetails book)
        {
            try
            {

                DataTable table = new DataTable();
                string query = @"
                    insert into dbo.BookingDetails
                    (Name,Email,Mobile,Date,Person,LocationId,logginUserId,TotalPrice)
                    values
                    
                          ('" + book.Name + @"', '" + book.Email + @"', '" + book.Mobile + @"','" + book.Date + @"','" + book.Person + @"', '" + book.LocationId + @"', '"+ book.logginUserId + @"','"+ book.TotalPrice + @"')
                    ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added Successfuly";
            }
            catch
            {
                return "Fail to add";
            }
        }
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @" Delete dbo.BookingDetails where id = " + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Delate  Successfuly";
            }
            catch
            {
                return "Failed to Delete";
            }
        }

    }
}