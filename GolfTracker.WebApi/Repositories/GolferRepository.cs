using System;
using System.Linq;
using GolfTracker.WebApi.Entities.Golfers;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Repositories
{
    public class GolferRepository : RepositoryBase<Golfer>, IGolferRepository
    {
        public GolferRepository():base("golfer", AppSettingsConfig.Db, "GolfCollection")
        {

        }
    }
}
