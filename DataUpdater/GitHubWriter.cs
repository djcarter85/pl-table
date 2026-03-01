namespace DataUpdater;

using NodaTime;
using Octokit;

public static class GitHubWriter
{
    public static async Task WriteAsync(string relativeFilePath, string fileContents, string branchName, Instant now)
    {
        var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN")
                    ?? throw new InvalidOperationException("GITHUB_TOKEN not set.");

        var gitHubClient = new GitHubClient(new ProductHeaderValue("daily-updater"))
        {
            Credentials = new Credentials(token)
        };

        var fullRepoName = Environment.GetEnvironmentVariable("GITHUB_REPOSITORY")
                            ?? throw new InvalidOperationException("GITHUB_REPOSITORY not set.");

        var repo = Repo.Parse(fullName: fullRepoName);
        
        var existingFile = await GetExistingFileAsync(gitHubClient, repo, relativeFilePath, branchName);

        if (existingFile != null && existingFile.Content.Trim() == fileContents.Trim())
        {
            Console.WriteLine("No changes detected. Skipping commit.");
            return;
        }

        await UpdateOrCreateFileAsync(gitHubClient, repo, relativeFilePath, fileContents, branchName, existingFile?.Sha, now);
    }

    private static async Task UpdateOrCreateFileAsync(
        GitHubClient gitHubClient,
        Repo repo,
        string relativeFilePath, 
        string fileContents, 
        string branchName,
        string? existingFileSha,
        Instant now)
    {
        var commitMessage = $"data: update {now:yyyy-MM-ddTHH:mm'Z'}";

        if (existingFileSha == null)
        {
            await gitHubClient.Repository.Content.CreateFile(
                owner: repo.Owner,
                name: repo.Name,
                path: relativeFilePath,
                new CreateFileRequest(
                    message: commitMessage,
                    content: fileContents,
                    branch: branchName)
            );

            Console.WriteLine("File created.");
        }
        else
        {
            await gitHubClient.Repository.Content.UpdateFile(
                owner: repo.Owner,
                name: repo.Name,
                path: relativeFilePath,
                new UpdateFileRequest(
                    message: commitMessage,
                    content: fileContents,
                    sha: existingFileSha,
                    branch: branchName)
            );

            Console.WriteLine("File updated.");
        }
    }

    private static async Task<RepositoryContent?> GetExistingFileAsync(
        GitHubClient github, 
        Repo repo,
        string relativeFilePath,
        string branchName)
    {
        try
        {
            var contents = await github.Repository.Content
                .GetAllContentsByRef(repo.Owner, repo.Name, relativeFilePath, branchName);

            return contents[0];
        }
        catch (NotFoundException)
        {
            return null;
        }
    }

    private record Repo(string Owner, string Name)
    {
        public static Repo Parse(string fullName)
        {
            var parts = fullName.Split('/');
            if (parts.Length != 2)
                throw new InvalidOperationException("Invalid GITHUB_REPOSITORY format.");

            return new Repo(Owner: parts[0], Name: parts[1]);
        }
    }
}