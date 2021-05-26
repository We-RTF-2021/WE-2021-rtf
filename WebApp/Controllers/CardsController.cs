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

        private readonly ILogger<CardController> _logger;

        public CardController(ILogger<CardController> logger, ApplicationDbContext d)
        {
            _logger = logger;
            db = d;
        }
        [HttpGet]
        public IEnumerable<ResultDTO> Get()
        {
            var s = HttpContext.Request.QueryString.Value.Split('=', '&');
            var userId = s[1];
            var setId = s[3];
            var cardsIds = db.Progress.ToList().Where(e => e.SetID.ToString() == setId && e.PersonName == userId);
            var result = new List<ResultDTO>();
            foreach (var e in db.Cards)
            {
                foreach (var f in cardsIds)
                    if (e.CardID == f.CardId)
                    {
                        result.Add(new ResultDTO() { status = f.Status, card = e });
                    }
            }
            return result;
        }

        public class ResultDTO
        {
            public int status { get; set; }
            public Card card { get; set; }
        }

        [HttpPut]
        [Produces("application/json", "application/xml")]
        public void Put([FromBody] DD data)
        {
            var dict = new Dictionary<int, int>(4) { [0] = 1, [1] = 3, [2] = 5, [3] = 7 };
            foreach (var card in data.cardIds)
            {
                var c = db.Progress.Where(e => e.CardId == card.cardId && e.PersonName == data.userId).First();
                if (card.isTrue)
                {
                    c.Status = c.Status < 3 ? c.Status + 1 : c.Status;
                }
                else
                {
                    c.Status = c.Status > 0 ? c.Status - 1 : c.Status;
                }
            }
            db.SaveChanges();
        }

        public class DD
        {
            public Guid setId { get; set; }
            public string userId { get; set; }

            public CardIds[] cardIds { get; set; }
        }

        public class CardIds
        {
            public Guid cardId { get; set; }
            public bool isTrue { get; set; }
        }
    }
}
