using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    [Table("Sets")]
    public class Set
    {
        [Key]
        public int ID { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("CountOfCards")]
        public int CountOfCards { get; set; }
        [Column("PersonId")]
        public string PersonId { get; set; }
        public Set(string name, int count, string PersId)
        {
            Name = name;
            CountOfCards = count;
            PersonId = PersId;
        }


    }
}