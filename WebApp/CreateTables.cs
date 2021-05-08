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
            command1.CommandText = "CREATE TABLE Sets(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,  Name TEXT NOT NULL, CountOfCards INTEGER NOT NULL, PersonId STRING )";
            command1.ExecuteNonQuery();
            command2.CommandText = "CREATE TABLE Cards(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, EN_Name TEXT NOT NULL, RU_Name TEXT NOT NULL, DaysForNext INTEGER NOT NULL, Status INTEGER NOT NULL CHECK (Status<=3), SetID INTEGER NOT NULL, FOREIGN KEY (SetID) REFERENCES Sets(id))";
            command2.ExecuteNonQuery();
            connection.Close();
        }
        public static void InsertAllTables()
        {
            connection.Open();
            SqliteCommand command1 = new SqliteCommand();
            command1.Connection = connection;
            // command1.CommandText = "INSERT INTO Sets (Name, CountOfCards,PersonId) VALUES ('Путешествие', 15, NULL), ('Фрукты и овощи', 15, NULL), ('Транспорт', 15, NULL)";
            command1.CommandText = "INSERT INTO Cards (EN_Name, RU_Name,DaysForNext, Status, SetID) VALUES ('Beach','Пляж',1,1,1), ('Фрукты и овощи', 15, NULL), ('Транспорт', 15, NULL)";
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
               reader.GetValue(0)}
                );
            }
            return res;
        }
    }
}
