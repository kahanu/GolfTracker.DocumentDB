using System;
using System.Linq;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Entities.Golfers
{
    /// <summary>
    /// This describes a round of golf for the golfer.
    /// </summary>
    public class Round
    {
        public int Score { get; set; }
        public int NetScore { get; set; }
        public DateTime DatePlayed { get; set; }
        public int DateEpoch { get { return DatePlayed.ToEpoch(); } }
        public GolfCourse GolfCourse { get; set; }
    }
}
