using System;
using System.Linq;
using GolfTracker.WebApi.Entities.GolfClubs;

namespace GolfTracker.WebApi.Entities.Golfers
{
    public class GolfCourse
    {
        public string GolfClubName { get; set; }
        public string GolfCourseName { get; set; }
        public Tee TeePlayed { get; set; }
    }
}
