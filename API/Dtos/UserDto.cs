using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UserDto
    {
        [Required]
        public string DisplayName { get; set; }

        public string Token { get; set; }

        public int TokensAvailable { get; set; }
    }
}
