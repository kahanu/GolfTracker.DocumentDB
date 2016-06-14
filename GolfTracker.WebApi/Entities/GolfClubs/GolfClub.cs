using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    [DataContract]
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


        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        public string Location { get; set; }

        [DataMember]
        public List<GolfCourse> GolfCourses { get; set; }
    }
}
