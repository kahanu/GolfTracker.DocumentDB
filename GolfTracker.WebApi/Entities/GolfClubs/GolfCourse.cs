using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    [DataContract]
    public class GolfCourse
    {
        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        public List<Tee> Tees { get; set; }
    }
}
