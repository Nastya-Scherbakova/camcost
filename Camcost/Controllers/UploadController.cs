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
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;

namespace Camcost.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        
        public static int LastUploadCount{ get; private set; } = 0;
        public IConfiguration Configuration { get; private set; }
        private ItemContext _context { get; set; }

        public UploadController(IConfiguration configuration, ItemContext context)
        {
            Configuration = configuration;
            _context = context;
        }


 

        [Obsolete("->Upload")]
        public ActionResult uploadObsolete(IFormCollection form)
        {
            
            var file = form.Files[0];
            
            var cathegory = form["cathegory"];
            var subcathJson = form["subcathegory"];
            var gender = Int32.Parse(form["gender"]);
         //   IEnumerable<string> subcath = JsonConvert.DeserializeObject<IEnumerable<string>>(form["subcathegory"]);
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
                            sbSql.AppendFormat(@"INSERT INTO [CamcostDB].[dbo].[Items] ([About],[Price],[Title],[Firm],[Cathegory],[Gender],[Subcathegories],[FilterNames],[FilterValues]) VALUES ('{0}', '{1}' , {2} , '{3}', '{4}', '{5}', '{6}' );", GV(sheet, j, 4), GVDouble(sheet, j, 6), GV(sheet, j, 2), GV(sheet, j, 22), cathegory, gender, subcathJson);
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

        
        [HttpPost]
        public async Task<ActionResult> Upload(IFormCollection form)
        {
            
            var file = form.Files[0];
            
            var cathegory = form["cathegory"];
            var subcathJson = form["subcathegories"];
            var gender = Int32.Parse(form["gender"]);
            List<string> subcath = JsonConvert.DeserializeObject<List<string>>(form["subcathegories"]);
            Gender g;
            List<Item> items = new List<Item>();
            switch (gender)
            {
                case 1:
                {
                    g = Gender.male; break;
                }
                case 2:
                {
                    g = Gender.female; break;
                }
                default:
                {
                    g = Gender.none;
                    break;
                }
            }
            if (file == null || file.Length == 0)
            {
                ModelState.AddModelError("file", "Файл не выбран");
                
            }

            if (Path.GetExtension(file.FileName) != ".xlsx")
            {
                ModelState.AddModelError("file", "Выберите файл с расширением xlsx");
                
            }
          
            using (var xls = new ExcelPackage(file.OpenReadStream()))
            {
                
                using (var sheet = xls.Workbook.Worksheets["Export Products Sheet"])
                {
                    for (int j = sheet.Dimension.Start.Row + 1; j <= sheet.Dimension.End.Row; j++)
                    {
                        if (sheet.Cells[j, 1].Value == null)
                            {
                            Item item = new Item()
                            {
                                About = GV(sheet, j, 4),
                                Price = GVDouble(sheet, j, 6),
                                Title = GV(sheet, j, 2),
                                Firm = GV(sheet, j, 25),
                                Cathegory = cathegory,
                                Gender = g,
                                Subcathegories = subcath,
                                FilterNames = GetFilterNames(sheet, j),
                                FilterValues = GetFilterValues(sheet, j),
                                Country = GV(sheet, j, 27)
                            };
                                //TODO: make shoure this condition is right (title, firm, gender) or smth else
                                var exist = await _context.Items.AnyAsync(el =>
                                    el.Title == item.Title && el.Firm == item.Firm && el.Gender == item.Gender);
                                if (exist) _context.Entry(item).State = EntityState.Modified;
                                else items.Add(item);
                                    

                            }
                        }
                }
            }

            try
            {
               await _context.Items.AddRangeAsync(items);
               await _context.SaveChangesAsync();
            }
            catch (DBConcurrencyException)
            {
                return Content("Возникла ошибка при добавлении в базу. Проверьте введённые данные и таблицу");
            }
            return Content("Успешно добавлено в базу данных");
        }

        private List<string> GetFilterNames(ExcelWorksheet sheet, int rowNo)
        {
            List<string> result=new List<string>();
            for (int i = 31; i < sheet.Dimension.End.Column; i += 3)
            {
                if(sheet.Cells[rowNo, i].Value!=null) result.Add(sheet.Cells[rowNo, i].Value.ToString());
            }

            return result;
        }

        private List<string> GetFilterValues(ExcelWorksheet sheet, int rowNo)
        {
            StringBuilder sb = new StringBuilder();
            List<string> result=new List<string>();
            for (int i = 32; i < sheet.Dimension.End.Column; i += 3)
            {
                if (sheet.Cells[rowNo, i + 1].Value != null)
                {
                    sb.AppendFormat(@"{0} {1}", sheet.Cells[rowNo, i + 1].Value.ToString(),
                        sheet.Cells[rowNo, i].Value.ToString());
                    string res = sheet.Cells[rowNo, i].Value != null
                        ? sb.ToString()
                        : sheet.Cells[rowNo, i + 1].Value.ToString();
                    result.Add(res);
                }
            }

            return result;
        }

        private double GVDouble(ExcelWorksheet sheet, int rowNo, int cellNo)
        {
            return sheet.Cells[rowNo, cellNo].Value != null ? Double.Parse(sheet.Cells[rowNo, cellNo].Value.ToString()) : 0;
        }
        private string GV(ExcelWorksheet sheet, int rowNo, int cellNo)
        {
            return sheet.Cells[rowNo, cellNo].Value != null ? sheet.Cells[rowNo, cellNo].Value.ToString() : "";
        }

       
    }
}