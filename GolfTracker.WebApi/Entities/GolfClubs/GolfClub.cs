using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    public class GolfClub : EntityBase
    {
        /// <summary>
        /// Pass the lowercase string name of the class to the base class.
        /// This is used in the repository for storage and querying, to organize
        /// documents by this type name.
        /// </summary>
        public GolfClub():base("golfclub")
        {

        }


        [Required]
        public string Name { get; set; }

        public string Location { get; set; }

        public List<GolfCourse> GolfCourses { get; set; }
    }
}
