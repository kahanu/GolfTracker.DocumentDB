using System;
using System.Configuration;
using System.Linq;

namespace GolfTracker.WebApi.Helpers
{
    public static class AppSettingsConfig
    {
        public static string Db { get { return ConfigurationManager.AppSettings["db"]; } }
        public static string EndPoint { get { return ConfigurationManager.AppSettings["endpoint"]; } }
        public static string AuthKey { get { return ConfigurationManager.AppSettings["authkey"]; } }
        public static string CorsPolicyOrigins { get { return ConfigurationManager.AppSettings["CorsPolicyOrigins"]; } }
    }
}
