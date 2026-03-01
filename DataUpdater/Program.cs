using System.Text.Json;
using DataUpdater;

var fplMatches = await FplApiClient.GetMatches();

var table = TableGenerator.Generate(fplMatches);

var json = JsonSerializer.Serialize(table, options: new() { WriteIndented = true });

Console.WriteLine(json);