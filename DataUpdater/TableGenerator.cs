namespace DataUpdater;

public static class TableGenerator
{
    public static IReadOnlyList<TableEntry> Generate(IReadOnlyList<FplMatch> matches, IReadOnlyList<FplTeam> fplTeams) =>
        matches
            .SelectMany(CreateOutcomes)
            .GroupBy(tmo => tmo.TeamId)
            .Select(g =>
                new TableEntryPrivate(
                    TeamShortName: GetTeamShortName(g.Key, fplTeams),
                    Played: g.Count(),
                    Points: g.Sum(tmo => tmo.Points),
                    For: g.Sum(tmo => tmo.For),
                    Against: g.Sum(tmo => tmo.Against)))
            .OrderByDescending(te => te.Points)
            .ThenByDescending(te => te.GoalDifference)
            .ThenByDescending(te => te.For)
            .ThenBy(te => te.TeamShortName)
            .Select((te, i) => te.ToTableEntry(position: i + 1))
            .ToList();

    private static string GetTeamShortName(int teamId, IReadOnlyList<FplTeam> fplTeams) =>
        fplTeams.Single(t => t.Id == teamId).ShortName;

    private static IEnumerable<TeamMatchOutcome> CreateOutcomes(FplMatch fplMatch)
    {
        if (!fplMatch.Finished || !fplMatch.TeamHScore.HasValue || !fplMatch.TeamAScore.HasValue)
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

    private record TableEntryPrivate(string TeamShortName, int Played, int Points, int For, int Against)
    {
        public int GoalDifference => this.For - this.Against;

        public TableEntry ToTableEntry(int position) =>
            new(
                Position: position,
                TeamShortName: TeamShortName,
                Played: Played,
                Points: Points);
    }
}