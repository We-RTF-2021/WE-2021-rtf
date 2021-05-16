using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace WebApp.Models
{
    public class Progress
    {
        [Required]
        public string PersonName { get; set; }

        [Required]
        public Guid CardId { get; set; }
        [ForeignKey("CardId")]
        public Card Card { get; set; }

        [Required]
        public int DaysForNext { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public Guid SetID { get; set; }
        [ForeignKey("SetID")]
        public Set Set { get; set; }
        public Progress(string PersonName, Guid CardId, Guid SetID)
        {
            this.PersonName = PersonName;
            this.CardId = CardId;
            DaysForNext = 1;
            Status = 0;
            this.SetID = SetID;
        }
    }
}