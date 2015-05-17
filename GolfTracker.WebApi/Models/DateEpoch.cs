using System;
using System.Linq;
using GolfTracker.WebApi.Helpers;

namespace GolfTracker.WebApi.Models
{
    /// <summary>
    /// This is not used at the moment.
    /// </summary>
    public class DateEpoch
    {
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
