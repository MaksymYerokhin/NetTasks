using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace NetTask1.Models
{
    /// <summary>
    /// Represents cookie consent.
    /// 
    /// ResponsesBitmask is an integer, whose bits stand for positive/negative responses.
    /// e.g. 5 = 101(2) means user responded positive on the 1st and 3rd questions
    /// </summary>
    public class Consent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("UserName")]
        public string UserName { get; set; }

        public int ResponsesBitmask { get; set; }

        public string WebSite { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Date { get; set; }
    }
}

// db.Consents.insert({'UserName': 'Max', 'ResponsesBitmask': 3, 'WebSite': 'google.com', 'Date': new Date()})
// db.Consents.insert({'UserName': 'Max', 'ResponsesBitmask': 15, 'WebSite': 'businessinsider.com', 'Date': new Date()})
// db.Consents.insert({'UserName': 'Andy', 'ResponsesBitmask': 5, 'WebSite': 'yandex.ru', 'Date': new Date()})