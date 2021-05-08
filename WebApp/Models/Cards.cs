using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace WebApp.Models
{
    [Table("Cards")]
    public class Card
    {
        [Key]
        public int ID { get; set; }
        [Column("EN_Name")]
        public string EN_Name { get; set; }
        [Column("RU_Name")]
        public string RU_Name { get; set; }
        [Column("DaysForNext")]
        public int DaysForNext { get; set; }
        [Column("Stutus")]
        public int Status { get; set; }
        [Column("SetID")]
        public int SetID { get; set; }

        public Card(string en, string ru, int setId)
        {
            EN_Name = en;
            RU_Name = ru;
            DaysForNext = 1;
            Status = 1;
            SetID = setId;
        }
    }
}