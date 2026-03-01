namespace DataUpdater;

public record TableEntry(int TeamId, int Points, int For, int Against)
{
    public int GoalDifference => this.For - this.Against;
}