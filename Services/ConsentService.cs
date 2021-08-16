using NetTask1.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Linq;
using System.Threading.Tasks;
using NetTask1.Settings;

namespace NetTask1.Services
{
    public class ConsentService
    {
        private readonly IMongoCollection<Consent> _userConsents;

        public ConsentService(IConsentDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _userConsents = database.GetCollection<Consent>(settings.ConsentCollectionName);
        }

        public List<Consent> Get() =>
            _userConsents.Find(consent => true).ToList();

        /// <summary>
        /// Gives the information on how many times the user has given a consent on the specific website.
        /// </summary>
        /// <returns>A list with consent count for every user-website pair</returns>
        public async Task<List<ConsentStats>> GetStatsAsync()
        {
            // Translates to mongo aggregation
            var result = await _userConsents.AsQueryable()
                .GroupBy(consent => new {
                    UserName = consent.UserName,
                    WebSite = consent.WebSite
                })
                .Select(group => new ConsentStats
                {
                    UserName = group.Key.UserName,
                    WebSite = group.Key.WebSite,
                    Count = group.Count()
                }).ToListAsync();

            return result;
        }

        public Consent Get(string id) =>
            _userConsents.Find<Consent>(consent => consent.Id == id).FirstOrDefault();

        public Consent Create(Consent consent)
        {
            _userConsents.InsertOne(consent);
            return consent;
        }

        public void Update(string id, Consent consentIn) =>
            _userConsents.ReplaceOne(consent => consent.Id == id, consentIn);

        public void Remove(Consent consentIn) =>
            _userConsents.DeleteOne(consent => consent.Id == consentIn.Id);

        public void Remove(string id) =>
            _userConsents.DeleteOne(consent => consent.Id == id);
    }
}