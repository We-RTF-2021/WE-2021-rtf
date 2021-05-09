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
        public IEnumerable<Set> Get()
        {
            var t = this.HttpContext.Request.Headers["Authorization"][0].Split(' ')[1];
            var userSets = db.Sets.Where(e => e.PersonId == t || e.PersonId == null);
            foreach (var set in userSets)
            {
                var count = set.CountOfCards;
                var card = db.Cards.Where(e => e.SetID == set.ID);
                set.progress[0] = (double)(card.Where(e => e.Status == 0).Count()) / (double)count * 100;
                set.progress[2] = (double)(card.Where(e => e.Status == 3).Count()) / (double)count * 100;
                set.progress[1] = 100 - set.progress[0] - set.progress[2];
            }
            return userSets;
        }

        [HttpPost]
        [Produces("application/json", "application/xml")]
        public void Post([FromBody] SetWithWords data)
        {
            var token = this.HttpContext.Request.Headers["Authorization"][0].Split(' ')[1];
            var set = new Set(data.setName, data.words.Length, token);
            db.Sets.Add(set);
            db.SaveChanges();
            foreach (var card in data.words)
            {
                var newCard = new Card(card.english, card.russian, db.Sets.Count());
                db.Cards.Add(newCard);
            }
            db.SaveChanges();
        }

        public class SetWithWords
        {
            public string setName { set; get; }
            public Word[] words { set; get; }
        }

        public class Word
        {
            public string russian { set; get; }
            public string english { set; get; }
        }
    }
}