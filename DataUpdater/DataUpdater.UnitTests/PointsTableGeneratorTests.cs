namespace DataUpdater.UnitTests;

using NUnit.Framework;

public static class PointsTableGeneratorTests
{
    [Test]
    public static void Table_with_zero_teams_results_in_zero_entries()
    {
        // This can happen at the beginning of the season before any matches have been played.
        IReadOnlyList<TableEntry> table = [];
        var pointsTable = PointsTableGenerator.Generate(table);
        
        Assert.That(pointsTable.Entries.Count(), Is.EqualTo(0));
    }
    [Test]
    public static void Table_with_single_team_results_in_single_entry()
    {
        IReadOnlyList<TableEntry> table = [new(Position: 1, TeamShortName: "ARS", Played: 10, Points: 25)];
        var pointsTable = PointsTableGenerator.Generate(table);
        
        Assert.That(pointsTable.Entries.Count(), Is.EqualTo(1));
    }
}