using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Web;
using System.IO;
using System.Text;
using System.Configuration;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.AspNetCore.Http;
using System.Data;
using Camcost.Models;

namespace Camcost.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        
        public static int LastUploadCount{ get; private set; } = 0;
        public IConfiguration Configuration { get; private set; }

        public UploadController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


 
        [HttpPost]
        public ActionResult Upload(IFormCollection form)
        {
            
            var file = form.Files[0];
            
            var cathegory = form["cathegory"];
        //    byte[] photo;
        //     using (System.IO.Stream PhotoStream = form.Files[1].OpenReadStream())
        //{
        //    long photoStreamLength = PhotoStream.Length;
        //    byte[] photoBytes = new byte[photoStreamLength + 1];
        //    PhotoStream.Read(photoBytes, 0, (int)photoStreamLength);
        //    photo = photoBytes;
        //}
            if (file == null || file.Length == 0)
            {
                ModelState.AddModelError("file", "Файл не выбран");
                
            }

            if (Path.GetExtension(file.FileName) != ".xlsx")
            {
                ModelState.AddModelError("file", "Выберите файл с расширением xlsx");
                
            }
            StringBuilder sbSql = new StringBuilder();
            //если будут импортироваться даты это настройка переключит текущую сессию SQL Server в формат дат ДД.ММ.ГГГГ
            sbSql.Append("set dateformat dmy;");
            //очистка таблицы получателя
            sbSql.Append("DELETE FROM [CamcostDB].[dbo].[Items];");
            using (var xls = new ExcelPackage(file.OpenReadStream()))
            {
                //тут подставьте имя своего листа, импортировать можно из любого листа
                using (var sheet = xls.Workbook.Worksheets["Export Products Sheet"])
                {
                    for (int j = sheet.Dimension.Start.Row + 1; j <= sheet.Dimension.End.Row; j++)
                    {
                        if (sheet.Cells[j, 1].Value == null)
                            {
                            sbSql.AppendFormat(@"INSERT INTO [CamcostDB].[dbo].[Items] ([Id],[About],[Price],[Title],[Firm],[Cathegory],[Gender]) VALUES ('{0}', '{1}' , {2} , '{3}', '{4}', '{5}', '{6}' );", Guid.NewGuid(), GV(sheet, j, 4), GVDouble(sheet, j, 6), GV(sheet, j, 2), GV(sheet, j, 22), cathegory, 0);
                            LastUploadCount++;
                            }
                        }
                }
            }
            using (var connection = new SqlConnection(Configuration.GetConnectionString("DefaultConnection")))
            {
                
                byte[] bytes = Encoding.Default.GetBytes(sbSql.ToString());
                var command = new SqlCommand(Encoding.UTF8.GetString(bytes), connection);
                
                if (connection != null)
                {
                    connection.Open();
                }
                
                int result = command.ExecuteNonQuery();
                connection.Close();
            }
            return Content("success");
        }
        private string GVDouble(ExcelWorksheet sheet, int rowNo, int cellNo)
        {
            return sheet.Cells[rowNo, cellNo].Value != null ? sheet.Cells[rowNo, cellNo].Value.ToString().Replace(',','.') : "0";
        }
        private string GV(ExcelWorksheet sheet, int rowNo, int cellNo)
        {
            return sheet.Cells[rowNo, cellNo].Value != null ? sheet.Cells[rowNo, cellNo].Value.ToString() : "";
        }
    }
}