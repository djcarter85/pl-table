namespace DataUpdater;

public record TableEntry(string TeamShortName, int Played, int Points, int For, int Against)
{
    public int GoalDifference => this.For - this.Against;
}