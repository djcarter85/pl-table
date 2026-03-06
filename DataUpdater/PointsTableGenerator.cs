using DataUpdater;

public static class PointsTableGenerator
{
    public static PointsTable Generate(IReadOnlyList<TableEntry> table)
    {
        var matchesPlayed = Mode(table, te => te.Played);
        return new PointsTable { Entries = GenerateEntries(table, matchesPlayed), MatchesPlayed = matchesPlayed };
    }

    private static IEnumerable<PointsTableEntry> GenerateEntries(IReadOnlyList<TableEntry> table, int matchesPlayed)
    {
        int? currentPoints = null;
        var clubs = new List<Club>();
        foreach (var tableEntry in table)
        {
            if (currentPoints.HasValue && tableEntry.Points != currentPoints.Value)
            {
                yield return new PointsTableEntry { Points = currentPoints.Value, Clubs = clubs };
                for (var points = currentPoints.Value - 1; points > tableEntry.Points; points--)
                {
                    yield return new PointsTableEntry { Points = points, Clubs = [] };
                }

                clubs.Clear();
            }

            currentPoints = tableEntry.Points;
            clubs.Add(
                new Club
                {
                    Name = tableEntry.TeamShortName,
                    MatchesPlayedOffset = tableEntry.Played - matchesPlayed,
                    Bracket = FormatBracket(tableEntry.Bracket)
                });
        }

        yield return new PointsTableEntry { Points = currentPoints.Value, Clubs = clubs };
    }

    private static int Mode<T>(IEnumerable<T> source, Func<T, int> keySelector) =>
        source
            .GroupBy(keySelector)
            .OrderByDescending(g => g.Count())
            .ThenBy(g => g.Key)
            .First()
            .Key;

    private static string? FormatBracket(TableBracket? bracket) =>
        bracket switch
        {
            TableBracket.ChampionsLeague => "championsLeague",
            TableBracket.Relegation => "relegation",
            null => null,
            _ => throw new ArgumentOutOfRangeException(nameof(bracket), bracket, null)
        };
}