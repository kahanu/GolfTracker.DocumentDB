using System;
using System.Linq;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Models
{
    /// <summary>
    /// This is not used at the moment. Useful for querying DocumentDB collections by date range.
    /// </summary>
    public class DateEpoch
    {
        // Needed for XML serialization when value is null.
        public DateEpoch()
        { }
        
        // Initialize using DateTime.
        public DateEpoch(DateTime date)
        {
            this.Date = date;
        }
        
        public DateTime Date { get; set; }
        public int Epoch
        {
            get
            {
                return (this.Date.Equals(null) || this.Date.Equals(DateTime.MinValue))
                    ? int.MinValue
                    : this.Date.ToEpoch();
            }
        }
    }
}
