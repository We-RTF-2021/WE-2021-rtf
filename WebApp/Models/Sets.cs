using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Set
    {
        [Key]
        public Guid SetID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int CountOfCards { get; set; }
        public string PersonId { get; set; }
        [NotMapped]
        public double[] progress { get; set; }
        public Set(string Name, int CountOfCards, string PersonId)
        {
            SetID = Guid.NewGuid();
            this.Name = Name;
            this.CountOfCards = CountOfCards;
            this.PersonId = PersonId;
            progress = new double[3];
        }
    }
}