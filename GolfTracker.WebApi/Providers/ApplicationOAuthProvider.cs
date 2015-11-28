using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GolfTracker.WebApi.Helpers;
using GolfTracker.WebApi.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;

namespace GolfTracker.WebApi.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // For best practices, you should use always use a dynamic access-control-allow-origin response.
            
            // Get the Allowed Origins from Helper
            string origins = AppSettingsConfig.CorsPolicyOrigins;
            
            // Get the Origin of the Request
            string requestOrigin = context.OwinContext.Request.Headers.Get("origin");

            // If the Origin of the Request is contained in the Allowed Origins Set Access-Control-Allow-Origin for that Origin only.
            if (origins.Contains(requestOrigin))
            {
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new string[] { requestOrigin });
            }

            // http://www.codeproject.com/Articles/742532/Using-Web-API-Individual-User-Account-plus-CORS-En
            // "This article helped me track down the issue that even though CORS is enabled application-wide, 
            // it still doesn't affect this OWIN component, so we have to enable it here also."
            
            // NOTE :: Only works when Allowed Origins is a single URI (not a comma separated list).
            //string origins = AppSettingsConfig.CorsPolicyOrigins;
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new string[] { origins });

            // Allow All Sample - Not recommended unless you are intentionally accepting requests from unknown origins.
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new string[] { "*" });

            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            // I needed to add this in order to check if the email was confirmed when a user log on.
            if (!user.EmailConfirmed)
            {
                context.SetError("email_not_confirmed", "User did not confirm email.");
                return;
            }

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
               OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
                CookieAuthenticationDefaults.AuthenticationType);

            AuthenticationProperties properties = CreateProperties(user.UserName);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}
