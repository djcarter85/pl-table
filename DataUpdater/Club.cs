using System.Text.Json.Serialization;

public class Club
{
    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("matchesPlayedOffset")]
    public int MatchesPlayedOffset { get; init; }

    [JsonPropertyName("bracket")]
    public string? Bracket { get; init; }
}