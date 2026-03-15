using System.Text.Json.Serialization;

namespace DataUpdater;

public class Club
{
    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("matchesPlayedOffset")]
    public int MatchesPlayedOffset { get; init; }

    [JsonPropertyName("bracket")]
    public string? Bracket { get; init; }
}