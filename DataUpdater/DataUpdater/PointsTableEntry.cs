using System.Text.Json.Serialization;

public class PointsTableEntry
{
    [JsonPropertyName("points")]
    public int Points { get; init; }

    [JsonPropertyName("clubs")]
    public IEnumerable<Club> Clubs { get; init; }
}