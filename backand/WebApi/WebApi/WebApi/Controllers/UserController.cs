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
    public class UserController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select id, userName,email, password,confirmPassword,mobile,type from dbo.Users";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TripDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(User user)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                    insert into dbo.Users
                    (userName, email, password, confirmPassword, mobile, type)
                    values
                    
                          ('" + user.userName + @"', '" + user.email + @"', '" + user.Password + @"', '" + user.confirmPassword + @"','" + user.mobile + @"', '" + user.type + @"')
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
        public string Put(User user)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @" update dbo.Users set 
                    userName ='" + user.userName + @"',
                    email ='" + user.email + @"',
                    password ='" + user.Password + @"',
                    confirmpassword='" + user.confirmPassword + @"',
                    mobile ='"" + user.mobile + @""',
                    type ='"" + user.type + @""',
                    where id = " + user.id + @"
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
                string query = @" Delete dbo.Users where id = " + id;
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