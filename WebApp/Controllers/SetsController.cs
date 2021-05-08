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
        [HttpHead("{token}")]
        public DbSet<Set> Get([FromHeader] string token)
        {
            var userSets = db.Sets.Where(e => e.PersonId == token || e.PersonId == null);
            return db.Sets;
        }

        [HttpPost]
        [Produces("application/json", "application/xml")]
        [HttpHead("{token}")]
        public void Post([FromHeader] string token, [FromBody] SetWithWords data)
        {
            var set = new Set(data.nameOfSet, data.words.Length, token);
            db.Sets.Add(set);
            foreach (var card in data.words)
            {
                var newCard = new Card(card.english, card.russian, db.Sets.Last().ID);
                db.Cards.Add(newCard);
            }
            db.SaveChanges();
        }

        public class SetWithWords
        {
            public string nameOfSet { set; get; }
            public Word[] words { set; get; }
        }

        public class Word
        {
            public string russian { set; get; }
            public string english { set; get; }
        }
    }
}