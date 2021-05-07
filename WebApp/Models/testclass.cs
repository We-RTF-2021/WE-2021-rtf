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
    [Table("TestSet")]
    public class Set
    {
        [Key]
        public int ID { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("CountOfCards")]
        public int CountOfCards { get; set; }

    }

}
