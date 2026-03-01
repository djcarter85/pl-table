using System.Text.Json.Serialization;

public class Data
{
    [JsonPropertyName("lastUpdated")] 
    public string LastUpdated { get; set; }

    [JsonPropertyName("table")] 
    public IEnumerable<PointsTableEntry> Table { get; set; }
}