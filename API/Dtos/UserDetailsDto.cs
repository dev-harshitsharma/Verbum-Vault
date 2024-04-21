using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UserDetailsDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }

        public int TokensAvailable { get; set; }
    }
}
