using DataUpdater;

public static class PointsTableGenerator
{
    public static IEnumerable<PointsTableEntry> Generate(IReadOnlyList<TableEntry> table)
    {
        int? currentPoints = null;
        var clubs = new List<Club>();
        foreach (var tableEntry in table)
        {
            if (currentPoints.HasValue && tableEntry.Points != currentPoints.Value)
            {
                yield return new PointsTableEntry { Points = currentPoints.Value, Clubs = clubs };
                for (var points = currentPoints.Value-1; points > tableEntry.Points; points--)
                {
                    yield return new PointsTableEntry { Points = points, Clubs = [] };
                }
                
                clubs.Clear();
            }

            currentPoints = tableEntry.Points;
            clubs.Add(new Club { Name = tableEntry.TeamShortName });
        }

        yield return new PointsTableEntry { Points = currentPoints.Value, Clubs = clubs };
    }
}