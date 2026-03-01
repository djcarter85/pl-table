namespace DataUpdater;

public static class TableGenerator
{
    public static IReadOnlyList<TableEntry> Generate(IReadOnlyList<FplMatch> matches)
    {
        var teamMatchOutcomes = matches.SelectMany(CreateOutcomes);

        return teamMatchOutcomes
            .GroupBy(tmo => tmo.TeamId)
            .Select(g => 
                new TableEntry(
                    TeamId: g.Key,
                    Points: g.Sum(tmo => tmo.Points),
                    For: g.Sum(tmo => tmo.For),
                    Against: g.Sum(tmo => tmo.Against)))
            .OrderByDescending(te => te.Points)
            .ThenByDescending(te => te.GoalDifference)
            .ThenByDescending(te => te.For)
            .ThenBy(te => te.TeamShortName)
            .ToList();
    }

    private static IEnumerable<TeamMatchOutcome> CreateOutcomes(FplMatch fplMatch)
    {
        if (!fplMatch.TeamHScore.HasValue || !fplMatch.TeamAScore.HasValue)
        {
            return [];
        }

        return
        [
            new TeamMatchOutcome(TeamId: fplMatch.TeamH, For: fplMatch.TeamHScore.Value, Against: fplMatch.TeamAScore.Value),
            new TeamMatchOutcome(TeamId: fplMatch.TeamA, For: fplMatch.TeamAScore.Value, Against: fplMatch.TeamHScore.Value),
        ];
    }

    private record TeamMatchOutcome(int TeamId, int For, int Against)
    {
        public int Points => this.For > this.Against ? 3 : this.Against > this.For ? 0 : 1;
    }
}