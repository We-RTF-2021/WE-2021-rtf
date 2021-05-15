using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Data
{
    public static class DataExtensions
    {
        public static void PrepareDB(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
                    if (env.IsDevelopment())
                    {
                        scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
                        var DbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                        DbContext.SeedWithSampleDataAsync().Wait();
                    }
                }
                catch (Exception e)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(e, "An error occurred while migrating or seeding the database.");
                }
            }
        }

        private static async Task SeedWithSampleDataAsync(this ApplicationDbContext dbContext)
        {
            dbContext.Sets.RemoveRange(dbContext.Sets);
            dbContext.Cards.RemoveRange(dbContext.Cards);
            dbContext.Progress.RemoveRange(dbContext.Progress);
            await dbContext.SaveChangesAsync();

            var sets = new[]
            {
                new Set("Путешествие", 15, null),
                new Set("Фрукты и овощи", 15, null),
                new Set("Транспорт", 15, null),
            };

            var cards = new[]{
                new Card("Beach", "Пляж", sets[0].SetID),
            };
            var progress = new List<Progress>();
            foreach (var user in dbContext.Users)
            {
                foreach (var card in cards)
                {
                    progress.Add(new Progress(user.Id, card.CardID, 1, card.SetID));
                }
            }

            dbContext.Sets.AddRange(sets);
            dbContext.Cards.AddRange(cards);
            dbContext.Progress.AddRange(progress);
            await dbContext.SaveChangesAsync();
        }
    }
}
