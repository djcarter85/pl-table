using System.Text.Json;

namespace DataUpdater;

public static class FplApiClient
{
    private static readonly HttpClient client = new();

    public static async Task<IReadOnlyList<FplMatch>> GetMatches()
    {
        var response = await client.GetAsync("https://fantasy.premierleague.com/api/fixtures/");
        
        var content = await response.Content.ReadAsStringAsync();

        var fplMatches = JsonSerializer.Deserialize<List<FplMatch>>(content);
        
        return fplMatches;
    }
}