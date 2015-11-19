using System;
using System.Configuration;
using System.Linq;

namespace GolfTracker.WebApi.Helpers
{
    public static class AppSettingsConfig
    {
        /// <summary>
        /// The name of the DocumentDB database.
        /// </summary>
        public static string Db { get { return ConfigurationManager.AppSettings["db"]; } }
        
        /// <summary>
        /// The DocumentDB collection to store User information.
        /// </summary>
        public static string UserCollection { get { return ConfigurationManager.AppSettings["userCollection"]; } }

        /// <summary>
        /// The DocumentDB collection (name) for storing main set of documents.
        /// You can add additional settings using this template to pass them into new custom repositories.
        /// Simply add the corresponding field to the web.config or update in the Azure Portal's app settings.
        /// Alternatively, if you want to specify a collection name directly in the repository, you can do that by
        /// passing the string directly in quotes.
        /// </summary>
        public static string MainCollection { get { return ConfigurationManager.AppSettings["mainCollection"]; } }

        /// <summary>
        /// The DocumentDB endpoint Uri.
        /// </summary>
        public static string EndPoint { get { return ConfigurationManager.AppSettings["endpoint"]; } }

        /// <summary>
        /// The DocumentDB authorization key.
        /// </summary>
        public static string AuthKey { get { return ConfigurationManager.AppSettings["authkey"]; } }

        /// <summary>
        /// The comma-separated list of domains, with no trailing slash!
        /// </summary>
        public static string CorsPolicyOrigins { get { return ConfigurationManager.AppSettings["CorsPolicyOrigins"]; } }

        /// <summary>
        /// The base Url for the host website that is calling the WebApi service.
        /// </summary>
        public static string ClientSite { get { return ConfigurationManager.AppSettings["ClientSite"]; } }
    }
}
