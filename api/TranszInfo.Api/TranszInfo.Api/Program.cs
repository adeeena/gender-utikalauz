using Microsoft.EntityFrameworkCore;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.BusinessLogic;
using TranszInfo.Logic.BusinessLogic.Interfaces;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMemoryCache();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ITranslationLogic, TranslationLogic>();
//builder.Services.AddScoped<ICategoryLogic, CategoryLogic>();
builder.Services.AddScoped<IEntryLogic, EntryLogic>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

WebApplication? app = builder.Build();

app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


