namespace DataUpdater;

public class PointsTable
{
    public IEnumerable<PointsTableEntry> Entries { get; set; }
    
    public int MatchesPlayed { get; set; }
}