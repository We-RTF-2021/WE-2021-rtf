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
            var userId = HttpContext.Request.QueryString.Value.Split('=')[1];
            var userSets = db.Sets.Where(e => e.PersonId == userId || e.PersonId == null);
            foreach (var set in userSets)
            {
                var count = set.CountOfCards;
                var card = db.Progress.Where(e => e.SetID == set.SetID && e.PersonName == userId);
                set.progress[0] = (double)(card.Where(e => e.Status == 0).Count()) / (double)count * 100;
                set.progress[2] = (double)(card.Where(e => e.Status == 3).Count()) / (double)count * 100;
                set.progress[1] = 100 - set.progress[0] - set.progress[2];
            }
            return userSets;
        }

        [HttpPost]
        [Produces("application/json", "application/xml")]
        public void Post([FromBody] SetToCreateDto data)
        {
            var userId = HttpContext.Request.QueryString.Value.Split('=')[1];
            var set = new Set(data.setName, data.words.Length, userId);
            db.Sets.Add(set);
            foreach (var card in data.words)
            {
                var newCard = new Card(card.english, card.russian, set.SetID);
                db.Cards.Add(newCard);
            }

            db.SaveChanges();
        }

        public class SetToCreateDto
        {
            public string setName { set; get; }
            public CardToCreateDto[] words { set; get; }
        }

        public class CardToCreateDto
        {
            public string russian { set; get; }
            public string english { set; get; }
        }
    }
}