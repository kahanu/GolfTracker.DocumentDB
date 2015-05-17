using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Cors;

namespace GolfTracker.WebApi.Cors
{
    public class CorsPolicyFactory : ICorsPolicyProviderFactory
    {
        ICorsPolicyProvider _provider = new MyCustomCorsPolicyProvider();

        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return _provider;
        }
    } 
}
