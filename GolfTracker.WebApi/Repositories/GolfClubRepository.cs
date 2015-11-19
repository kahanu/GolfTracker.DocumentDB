using System;
using System.Linq;
using GolfTracker.WebApi.Entities.GolfClubs;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Repositories
{
    public class GolfClubRepository : RepositoryBase<GolfClub>, IGolfClubRepository
    {
        public GolfClubRepository():base("golfclub", AppSettingsConfig.Db, AppSettingsConfig.MainCollection)
        {

        }
    }
}
