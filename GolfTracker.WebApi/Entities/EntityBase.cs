using System;
using System.Linq;
using Newtonsoft.Json;

namespace GolfTracker.WebApi.Entities
{
    /// <summary>
    /// This is the base class that all root entity classes inherit.  This will 
    /// allow the type of entity to be passed in which is used for the 
    /// Where predicate in the RepositoryBase class.
    /// </summary>
    public class EntityBase
    {
        private readonly string _type;

        /// <summary>
        /// All root entities inherit this base class.
        /// </summary>
        /// <param name="type">The name of the type of entity (lowercase).</param>
        public EntityBase(string type)
        {
            this._type = type;
        }

        /// <summary>
        /// This is need for querying in the RepositoryBase. Used by DocumentDB.
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        /// <summary>
        /// This type field will be used to organize the documents by "type" in 
        /// DocumentDB in a single-collection scenario.  The type is just the lowercase
        /// name of the derived class.
        /// </summary>
        public string type { get { return _type; } }
    }
}
