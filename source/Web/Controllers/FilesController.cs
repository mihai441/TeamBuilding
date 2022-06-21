using Architecture.Application;
using DotNetCore.AspNetCore;
using DotNetCore.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Architecture.Web;

[ApiController]
[Route("files")]
public sealed class FilesController : ControllerBase
{
    private readonly string _directory;
    private readonly IFileService _fileService;

    public FilesController
    (
        IFileService fileService,
        IHostEnvironment environment
    )
    {
        _directory = @"C:\Fisiere";
        _fileService = fileService;
    }

    [DisableRequestSizeLimit]
    [HttpPost]
    public Task<IEnumerable<BinaryFile>> AddAsync() => _fileService.AddAsync(_directory, Request.Files());

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id) =>  Ok(await _fileService.GetAsync(_directory, id));
}
