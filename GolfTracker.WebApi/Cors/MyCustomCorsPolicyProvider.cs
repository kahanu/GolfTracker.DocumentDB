using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Cors
{
    public class MyCustomCorsPolicyProvider : ICorsPolicyProvider
    {
        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            CorsPolicy corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true
                // Optionally ::
                //,AllowAnyOrigin = true
            };
            
            // Get Allowed Origins from Config and split by comma. Can be changed to any character that you chose.
            string[] origins = AppSettingsConfig.CorsPolicyOrigins.Split(',');
            
            // To split by multiple types use the following example as a template:
            // string[] origins = AppSettingsCOnfig.CorsPolicyOrigins.Split(',','+');

            foreach (var origin in origins)
            {
                corsPolicy.Origins.Add(origin);
            }

            return Task.FromResult(corsPolicy);
        }
    }
}
