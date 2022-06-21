using Architecture.Application;
using Architecture.Database;
using DotNetCore.AspNetCore;
using DotNetCore.EntityFrameworkCore;
using DotNetCore.IoC;
using DotNetCore.Logging;
using DotNetCore.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder();

builder.Host.UseSerilog();

builder.Services.AddHashService();
builder.Services.AddAuthenticationJwtBearer(new JwtSettings(Guid.NewGuid().ToString(), TimeSpan.FromHours(12)));
builder.Services.AddResponseCompression();
builder.Services.AddControllers().AddJsonOptions().AddAuthorizationPolicy();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddContext<Context>(options => options.UseSqlServer(builder.Services.GetConnectionString(nameof(Context))));
builder.Services.AddClassesMatchingInterfaces(typeof(IUserService).Assembly, typeof(IUserRepository).Assembly);
builder.Services.AddSpaStaticFiles("Frontend");



var application = builder.Build();
var docsFileProvider = new PhysicalFileProvider(@"C:\Fisiere");

application.UseException();
application.UseHttps();
application.UseResponseCompression();
application.UseDefaultFiles();
application.UseStaticFiles(new StaticFileOptions
{
    FileProvider = docsFileProvider,
    RequestPath = "/Fisiere"
});

application.UseRouting();
application.UseSpaStaticFiles();
application.UseAuthentication();
application.UseAuthorization();
application.UseEndpointsMapControllers();
application.UseSwagger();
application.UseSwaggerUI();
application.UseSpaAngular("Frontend", "start", "http://localhost:4200");

application.Run();
