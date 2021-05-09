using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class CardController : ControllerBase
    {

        private readonly ApplicationDbContext db;
        private readonly ILogger<WeatherForecastController> _logger;

        public CardController(ILogger<WeatherForecastController> logger, ApplicationDbContext d)
        {
            _logger = logger;
            db = d;
        }
        [HttpGet]
        public IEnumerable<Card> Get()
        {
            //int.Parse(this.HttpContext.Request.Headers["Authorization"][0].Split(' ')[1]);
            var s = int.Parse(HttpContext.Request.QueryString.Value.Split('=')[1]);
            var cards = db.Cards.Where(e => e.SetID == s);
            foreach (var card in cards)
            {
                card.DaysForNext = card.DaysForNext == 0 ? card.DaysForNext : card.DaysForNext - 1;
            }
            db.SaveChanges();
            cards = db.Cards.Where(e => e.SetID == s && e.DaysForNext == 0);
            return cards;
        }

        [HttpPut]
        [Produces("application/json", "application/xml")]
        public void Put([FromBody] DD data)
        {
            var dict = new Dictionary<int, int>(4) { [0] = 1, [1] = 3, [2] = 5, [3] = 7 };
            var cards = db.Cards.Where(e => e.SetID == data.setId && e.DaysForNext == 0);
            foreach (var card in cards)
            {
                foreach (var d in data.cardIds)
                {
                    if (card.ID == d.cardId)
                    {
                        if (d.isTrue)
                        {
                            card.Status = card.Status < 3 ? card.Status + 1 : card.Status;
                            card.DaysForNext = dict[card.Status];
                        }
                        else
                        {
                            card.Status = card.Status > 0 ? card.Status - 1 : card.Status;
                            card.DaysForNext = dict[card.Status];
                        }
                    }
                }
            }
            db.SaveChanges();
        }

        public class DD
        {
            public int setId { get; set; }

            public CardIds[] cardIds { get; set; }
        }

        public class CardIds
        {
            public int cardId { get; set; }
            public bool isTrue { get; set; }
        }
    }
}

