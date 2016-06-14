using System;
using System.Linq;
using System.Runtime.Serialization;
using GolfTracker.WebApi.Entities.GolfClubs;

namespace GolfTracker.WebApi.Entities.Golfers
{
    [DataContract]
    public class GolfCourse
    {
        [DataMember]
        public string GolfClubName { get; set; }
        [DataMember]
        public string GolfCourseName { get; set; }
        [DataMember]
        public Tee TeePlayed { get; set; }
    }
}
