using System.Text.Json;

namespace DataUpdater;

using System.Text.Json.Serialization;

public static class FplApiClient
{
    private static readonly HttpClient client = new();

    public static async Task<IReadOnlyList<FplMatch>> GetMatches()
    {
        var response = await client.GetAsync("https://fantasy.premierleague.com/api/fixtures/");
        
        var content = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<List<FplMatch>>(content)!;
    }

    public static async Task<IReadOnlyList<FplTeam>> GetTeams()
    {
        var response = await client.GetAsync("https://fantasy.premierleague.com/api/bootstrap-static/");
        
        var content = await response.Content.ReadAsStringAsync();

        var bootstrapStatic = JsonSerializer.Deserialize<FplBootstrapStatic>(content)!;
        
        return bootstrapStatic.Teams;
    }

    private class FplBootstrapStatic
    {
        [JsonPropertyName("teams")]
        public List<FplTeam> Teams { get; set; }
    }
}