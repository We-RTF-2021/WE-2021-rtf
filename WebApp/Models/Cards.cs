using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace WebApp.Models
{
    public class Card
    {
        [Key]
        public Guid CardID { get; set; }
        [Required]
        public string EN_Name { get; set; }
        [Required]
        public string RU_Name { get; set; }

        [Required]
        public Guid SetID { get; set; }
        [ForeignKey("SetID")]
        public Set Set { get; set; }


        public Card(string EN_Name, string RU_Name, Guid SetID)
        {
            CardID = Guid.NewGuid();
            this.EN_Name = EN_Name;
            this.RU_Name = RU_Name;
            this.SetID = SetID;
        }
    }
}