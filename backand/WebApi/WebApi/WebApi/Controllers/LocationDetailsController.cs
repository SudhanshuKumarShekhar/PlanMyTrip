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
    public class LocationDetailsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select id, Name,Price,Address,Description,Image from dbo.TripDetails";
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
            string query = @"select id, Name,Price,Address,Description from dbo.TripDetails where id= "+id;
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(LocationDetails location)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                    insert into dbo.TripDetails
                    (Name,Price,Address,Description,Image)
                    values
                    
                          ('" + location.Name + @"', '" + location.Price + @"', '" + location.Address + @"', '" + location.Description + @"','" + location.Image + @"')
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
        public string Put(LocationDetails location)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @" update dbo.TripDetails set 
                    Name ='" + location.Name + @"',
                    Price =" + location.Price + @",
                    Address ='" + location.Address + @"',
                    Description='" + location.Description + @"'
                    where id = " + location.id + @"
                    ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Updated Successfuly";
            }
            catch
            {
                return "Failed to update";
            }
        }
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @" Delete dbo.TripDetails where id = " + id;
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
