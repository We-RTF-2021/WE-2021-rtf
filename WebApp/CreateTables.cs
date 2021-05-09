using System.Collections.Generic;
using Microsoft.Data.Sqlite;
using WebApp.Models;

namespace WebApp
{
    class CreateTables
    {
        private static SqliteConnection connection = new SqliteConnection("Data Source=app.db");

        public static void CreateAllTables()
        {
            connection.Open();
            SqliteCommand command1 = new SqliteCommand();
            SqliteCommand command2 = new SqliteCommand();
            command1.Connection = connection;
            command2.Connection = connection;
            command1.CommandText = "CREATE TABLE Sets(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,  " +
                "Name TEXT NOT NULL, CountOfCards INTEGER NOT NULL, " +
                "PersonId STRING )";
            command1.ExecuteNonQuery();
            command2.CommandText = "CREATE TABLE Cards(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, " +
                "EN_Name TEXT NOT NULL, " +
                "RU_Name TEXT NOT NULL, " +
                "DaysForNext INTEGER NOT NULL, " +
                "Status INTEGER NOT NULL CHECK (Status<=3), " +
                "SetID INTEGER NOT NULL, " +
                    "FOREIGN KEY (SetID) REFERENCES Sets(id))";
            command2.ExecuteNonQuery();
            connection.Close();
        }

        public static void DropAll()
        {
            connection.Open();
            SqliteCommand command1 = new SqliteCommand();
            command1.Connection = connection;
            command1.CommandText = "DROP TABLE Cards";
            command1.ExecuteNonQuery();
            command1.CommandText = "DROP TABLE Sets";
            command1.ExecuteNonQuery();
            // command1.CommandText = "REINDEX Cards";
            // command1.ExecuteNonQuery();
            // command1.CommandText = "VACUUM";
            connection.Close();
        }
        public static void InsertAllTables()
        {
            connection.Open();
            SqliteCommand command1 = new SqliteCommand();
            command1.Connection = connection;
            // command1.CommandText = "INSERT INTO Sets (Name, CountOfCards,PersonId) VALUES " +
            //     "('Путешествие', 15, NULL), " +
            //     "('Фрукты и овощи', 15, NULL), " +
            //     "('Транспорт', 15, NULL)";
            command1.CommandText = "INSERT INTO Cards (EN_Name, RU_Name,DaysForNext, Status, SetID) VALUES " +
                "('Beach','Пляж',1,0,1), " +
                "('Lounger','Шезлонг',1,0,1), " +
                "('Sea','Море',1,0,1), " +
                "('Hotel','Отель',1,0,1), " +
                "('Luggage','Гараж',1,0,1), " +

                "('Pool','Бассейн',1,0,1), " +
                "('Excursion','Экскурсия',1,0,1), " +
                "('Sand','Песок',1,0,1), " +
                "('Hotel room','Номер',1,0,1), " +
                "('Swimsuit','Купальник',1,0,1), " +

                "('Suntan cream','Крем для загара',1,0,1), " +
                "('Wawes','Волны',1,0,1), " +
                "('Suitcase','Чемодан',1,0,1), " +
                "('Plane','Самолет',1,0,1), " +
                "('Ticket','Билет',1,0,1), " +


                "('Boat','Лодка',1,0,3), " +
                "('Ship','Корабль',1,0,3), " +
                "('Plane','Самолет',1,0,3), " +
                "('Car','Машина',1,0,3), " +
                "('Helicopter','Вертолет',1,0,3), " +

                "('Speedboat','Катер',1,0,3), " +
                "('Cart','Телега',1,0,3), " +
                "('Bicycle','Велосипед',1,0,3), " +
                "('Bike','Байк',1,0,3), " +
                "('Motor ship','Теплоход',1,0,3), " +

                "('Train','Поезд',1,0,3), " +
                "('Trolleybus','Троллейбус',1,0,3), " +
                "('Truck','Грузовик',1,0,3), " +
                "('Bus','Автобус',1,0,3), " +
                "('Tram','Трамвай',1,0,3), " +


                "('Apple','Яблоко',1,0,2), " +
                "('Banana','Банан',1,0,2), " +
                "('Pear','Груша',1,0,2), " +
                "('Qiwi','Киви',1,0,2), " +
                "('Orange','Апельсин',1,0,2), " +

                "('Tomato','Помидор',1,0,2), " +
                "('Cucumber','Огурец',1,0,2), " +
                "('Melon','Дыня',1,0,2), " +
                "('Watermelon','Арбуз',1,0,2), " +
                "('Beet','Свекла',1,0,2), " +

                "('Cabbage','Капуста',1,0,2), " +
                "('Carrot','Морковь',1,0,2), " +
                "('Grape','Виноград',1,0,2), " +
                "('Cherry','Вишня',1,0,2), " +
                "('Strawberry','Клубника',1,0,2)";
            command1.ExecuteNonQuery();
            connection.Close();
        }

        public static List<List<object>> GetDate()
        {
            connection.Open();
            SqliteCommand command = new SqliteCommand();
            command.Connection = connection;
            command.CommandText = "SELECT * FROM Sets";
            SqliteDataReader reader = command.ExecuteReader();
            var res = new List<List<object>>();
            while (reader.Read())   // построчно считываем данные
            {
                res.Add(new List<object>{
               reader.GetValue(1)}
                );
            }
            return res;
        }
    }
}
