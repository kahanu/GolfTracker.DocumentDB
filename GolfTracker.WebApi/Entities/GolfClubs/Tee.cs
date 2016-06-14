using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;

namespace GolfTracker.WebApi.Entities.GolfClubs
{
    [DataContract]
    public class Tee
    {
        [DataMember]
        [Required]
        public string TeeName { get; set; }

        [DataMember]
        public string Gender { get; set; }

        [DataMember]
        public int Length { get; set; }

        [DataMember]
        public int Slope { get; set; }

        [DataMember]
        public double Rating { get; set; }

        [DataMember]
        public int Par { get; set; }

    }
}
