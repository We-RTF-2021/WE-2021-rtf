using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class SetController : ControllerBase
    {

        private readonly ApplicationDbContext db;
        private readonly ILogger<WeatherForecastController> _logger;

        public SetController(ILogger<WeatherForecastController> logger, ApplicationDbContext d)
        {
            _logger = logger;
            db = d;
        }
        [HttpGet]
        public DbSet<Set> Get()
        {
            return db.TestSet;
            // var t = new Models.Set();
            // t.ID = 4;
            // t.Name = "ree";
            // t.CountOfCards = 6;
            // return new[] { t };
        }

        [HttpPost]
        [Produces("application/json", "application/xml")]
        public void Post([FromBody] string Data)
        {
            var e = JsonSerializer.Deserialize<fef>(Data);
            var we = new Set();
            we.Name = e.nameOfSet;
            we.CountOfCards = e.ids;
            db.TestSet.Add(we);
            db.SaveChanges();
        }

        class fef
        {
            public string nameOfSet;
            public int ids;
        }
    }
}
