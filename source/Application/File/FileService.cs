using DotNetCore.Objects;

namespace Architecture.Application;

public sealed class FileService : IFileService
{
    public Task<IEnumerable<BinaryFile>> AddAsync(string directory, IEnumerable<BinaryFile> files)
    {
        return files.SaveAsync(directory);
    }

    public async Task<string> GetAsync(string directory, Guid id)
    {
        return Path.GetRelativePath(System.AppDomain.CurrentDomain.BaseDirectory, $"Fisiere//{id}.jpg").Replace(@"\", "/");
    }
}
