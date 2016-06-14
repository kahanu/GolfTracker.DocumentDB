using System;
using System.Linq;
using System.Runtime.Serialization;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Entities.Golfers
{
    /// <summary>
    /// This describes a round of golf for the golfer.
    /// </summary>
    [DataContract]
    public class Round
    {
        [DataMember]
        public int Score { get; set; }
        [DataMember]
        public int NetScore { get; set; }
        [DataMember]
        public DateTime DatePlayed { get; set; }
        public int DateEpoch { get { return DatePlayed.ToEpoch(); } }
        [DataMember]
        public GolfCourse GolfCourse { get; set; }
    }
}
