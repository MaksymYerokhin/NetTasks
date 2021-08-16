using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetTask1.Models
{
    public class ConsentDatabaseSettings : IConsentDatabaseSettings
    {
        public string ConsentCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IConsentDatabaseSettings
    {
        string ConsentCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
