using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GolfTracker.WebApi.Entities.Golfers
{
    public class Golfer : EntityBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying, to organize
        /// documents by this type name.
        /// </summary>
        public Golfer()
            : base("golfer")
        {

        }


        [Required]
        public string Name { get; set; }

        public decimal Handicap { get; set; }

        public bool IsPlus { get; set; }

        public List<Round> Rounds { get; set; }
    }
}
