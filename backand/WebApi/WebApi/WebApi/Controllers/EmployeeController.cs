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
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select EmployeeID, FristName, LastName
                            ,EmpCode, Position, Office from dbo.Employees";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                    insert into dbo.Employees 
                    (FristName, LastName, EmpCode, Position, Office)
                    values
                    
                          ('" + emp.FristName + @"', '" + emp.LastName + @"', '" + emp.EmpCode + @"', '" + emp.Position + @"','" + emp.Office + @"')
                    ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
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
        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @" update dbo.Employees set 
                    FristName ='" + emp.FristName + @"',
                    LastName ='" + emp.LastName + @"',
                    EmpCode ='" + emp.EmpCode + @"',
                    Position='" + emp.Position + @"',
                    Office='" + emp.Office + @"'
                    where EmployeeID = " + emp.EmployeeID + @"
                    ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
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
                string query = @" Delete dbo.Employees where EmployeeID = " + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
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
