using System.Text.Json.Serialization;

namespace DataUpdater;

public class FplMatch
{
    [JsonPropertyName("team_h")]
    public int TeamH { get; set; }
    
    [JsonPropertyName("team_a")]
    public int TeamA { get; set; }
    
    [JsonPropertyName("team_h_score")]
    public int? TeamHScore { get; set; }
    
    [JsonPropertyName("team_a_score")]
    public int? TeamAScore { get; set; }
}