using System.Text.Json;
using DataUpdater;

var fplMatches = await FplApiClient.GetMatches();
var fplTeams = await FplApiClient.GetTeams();

var table = TableGenerator.Generate(fplMatches, fplTeams);

var json = JsonSerializer.Serialize(table, options: new() { WriteIndented = true });

Console.WriteLine(json);