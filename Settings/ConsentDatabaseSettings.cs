namespace NetTask1.Settings
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
