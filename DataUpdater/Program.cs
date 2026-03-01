using System.Text.Json;
using DataUpdater;

var fplMatches = await FplApiClient.GetMatches();
var fplTeams = await FplApiClient.GetTeams();

var table = TableGenerator.Generate(fplMatches, fplTeams);

var pointsTable = PointsTableGenerator.Generate(table);

var json = JsonSerializer.Serialize(pointsTable, options: new() { WriteIndented = true });

Console.WriteLine(json);