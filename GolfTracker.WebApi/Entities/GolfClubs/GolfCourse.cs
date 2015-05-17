using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    public class GolfCourse
    {
        [Required]
        public string Name { get; set; }

        public List<Tee> Tees { get; set; }
    }
}
