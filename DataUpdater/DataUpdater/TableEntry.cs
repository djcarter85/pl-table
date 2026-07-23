namespace DataUpdater;

public record TableEntry(
    int Position,
    string TeamShortName,
    int Played,
    int Points)
{
    public TableBracket? Bracket =>
        this.Position switch
        {
            <= 4 => TableBracket.ChampionsLeague,
            >= 18 => TableBracket.Relegation,
            _ => null
        };
}
