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
                new Card("Lounger", "Шезлонг", sets[0].SetID),
                new Card("Sea", "Море", sets[0].SetID),
                new Card("Hotel", "Отель", sets[0].SetID),
                new Card("Luggage", "Багаж", sets[0].SetID),
                new Card("Pool", "Бассейн", sets[0].SetID),
                new Card("Excursion", "Экскурсия", sets[0].SetID),
                new Card("Sand", "Песок", sets[0].SetID),
                new Card("Hotel room", "Номер", sets[0].SetID),
                new Card("Swimsuit", "Купальник", sets[0].SetID),
                new Card("Suntan cream", "Крем для загара", sets[0].SetID),
                new Card("Wawes", "Волны", sets[0].SetID),
                new Card("Suitcase", "Чемодан", sets[0].SetID),
                new Card("Plane", "Самолет", sets[0].SetID),
                new Card("Ticket", "Билет", sets[0].SetID),

                new Card("Apple", "Яблоко", sets[1].SetID),
                new Card("Banana", "Банан", sets[1].SetID),
                new Card("Pear", "Груша", sets[1].SetID),
                new Card("Qiwi", "Киви", sets[1].SetID),
                new Card("Orange", "Апельсин", sets[1].SetID),
                new Card("Tomato", "Помидор", sets[1].SetID),
                new Card("Cucumber", "Огурец", sets[1].SetID),
                new Card("Melon", "Дыня", sets[1].SetID),
                new Card("Watermelon", "Арбуз", sets[1].SetID),
                new Card("Beet", "Свекла", sets[1].SetID),
                new Card("Cabbage", "Капуста", sets[1].SetID),
                new Card("Carrot", "Морковь", sets[1].SetID),
                new Card("Grape", "Виноград", sets[1].SetID),
                new Card("Cherry", "Вишня", sets[1].SetID),
                new Card("Strawberry", "Клубника", sets[1].SetID),

                new Card("Tram", "Трамвай", sets[2].SetID),
                new Card("Bus", "Автобус", sets[2].SetID),
                new Card("Truck", "Грузовик", sets[2].SetID),
                new Card("Trolleybus", "Троллейбус", sets[2].SetID),
                new Card("Train", "Поезд", sets[2].SetID),
                new Card("Motor ship", "Теплоход", sets[2].SetID),
                new Card("Bike", "Байк", sets[2].SetID),
                new Card("Bicycle", "Велосипед", sets[2].SetID),
                new Card("Cart", "Телега", sets[2].SetID),
                new Card("Speedboat", "Катер", sets[2].SetID),
                new Card("Helicopter", "Вертолет", sets[2].SetID),
                new Card("Car", "Машина", sets[2].SetID),
                new Card("Plane", "Самолет", sets[2].SetID),
                new Card("Ship", "Корабль", sets[2].SetID),
                new Card("Boat", "Лодка", sets[2].SetID),
            };
            var progress = new List<Progress>();
            foreach (var user in dbContext.Users)
            {
                foreach (var card in cards)
                {
                    progress.Add(new Progress(user.Id, card.CardID, card.SetID));
                }
            }

            dbContext.Sets.AddRange(sets);
            dbContext.Cards.AddRange(cards);
            dbContext.Progress.AddRange(progress);
            await dbContext.SaveChangesAsync();
        }
    }
}
