using System.Globalization;
using System.Text.Json;
using DataUpdater;
using NodaTime;

var now = SystemClock.Instance.GetCurrentInstant();

var fplMatches = await FplApiClient.GetMatches();
var fplTeams = await FplApiClient.GetTeams();

var table = TableGenerator.Generate(fplMatches, fplTeams);

var pointsTable = PointsTableGenerator.Generate(table);

var data = new Data
{
    LastUpdated = now.ToString("yyyy-MM-ddTHH:mm'Z'", CultureInfo.InvariantCulture), 
    Table = pointsTable
};

var json = JsonSerializer.Serialize(data, options: new() { WriteIndented = true });

await GitHubWriter.WriteAsync(
    relativeFilePath: "src/data.json", fileContents: json, branchName: "main", now: now);