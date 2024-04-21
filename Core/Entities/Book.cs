using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Book : BaseEntity
    {
        public string Name { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public bool IsBookAvailable { get; set; }
        public string Description { get; set; }
        public AppUser LentByUser { get; set; }
        public int? LentByUserId { get; set; }
        public AppUser CurrentlyBorrowedByUser { get; set; }
        public int? CurrentlyBorrowedByUserId { get; set; }
    }
}
