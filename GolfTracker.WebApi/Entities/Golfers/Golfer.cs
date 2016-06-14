using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;

namespace GolfTracker.WebApi.Entities.Golfers
{
    [DataContract]
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

        [DataMember]
        [Required]
        public string Name { get; set; }

        [DataMember]
        public decimal Handicap { get; set; }

        [DataMember]
        public bool IsPlus { get; set; }

        [DataMember]
        public List<Round> Rounds { get; set; }

        [DataMember]
        public string UserName { get; set; }
    }
}
