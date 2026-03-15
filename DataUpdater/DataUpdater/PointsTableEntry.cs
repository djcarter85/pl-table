using System.Text.Json.Serialization;

namespace DataUpdater;

public class PointsTableEntry
{
    [JsonPropertyName("points")]
    public int Points { get; init; }

    [JsonPropertyName("clubs")]
    public IEnumerable<Club> Clubs { get; init; }
}