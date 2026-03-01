namespace DataUpdater;

public record TableEntry(string TeamShortName, int Points, int For, int Against)
{
    public int GoalDifference => this.For - this.Against;
}