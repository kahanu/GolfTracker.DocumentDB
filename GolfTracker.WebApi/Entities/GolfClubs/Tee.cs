using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    public class Tee
    {
        [Required]
        public string TeeName { get; set; }

        public string Gender { get; set; }

        public int Length { get; set; }

        public int Slope { get; set; }

        public double Rating { get; set; }

        public int Par { get; set; }

    }
}
