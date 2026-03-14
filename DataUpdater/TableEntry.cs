namespace DataUpdater;

public record TableEntry(
    int Position,
    string TeamShortName,
    int Played,
    int Points,
    int For,
    int Against,
    int GoalDifference)
{
    public TableBracket? Bracket =>
        this.Position switch
        {
            <= 4 => TableBracket.ChampionsLeague,
            >= 18 => TableBracket.Relegation,
            _ => null
        };
}
