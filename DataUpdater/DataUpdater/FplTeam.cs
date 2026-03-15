namespace DataUpdater;

using System.Text.Json.Serialization;

public class FplTeam
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("short_name")]
    public string ShortName { get; set; }
}