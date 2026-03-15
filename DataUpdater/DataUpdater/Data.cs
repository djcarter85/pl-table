using System.Text.Json.Serialization;

namespace DataUpdater;

public class Data
{
    [JsonPropertyName("lastUpdated")] 
    public string LastUpdated { get; set; }
    
    [JsonPropertyName("matchesPlayed")] 
    public int MatchesPlayed { get; set; }

    [JsonPropertyName("table")] 
    public IEnumerable<PointsTableEntry> Table { get; set; }
}