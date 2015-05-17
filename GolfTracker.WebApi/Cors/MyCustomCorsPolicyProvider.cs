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
            };

            string origins = AppSettingsConfig.CorsPolicyOrigins;
            string[] originsList = origins.Split(',');

            foreach (var item in originsList)
            {
                corsPolicy.Origins.Add(item);
            }

            return Task.FromResult(corsPolicy);
        }
    }
}
