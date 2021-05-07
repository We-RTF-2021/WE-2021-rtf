using System.Collections.Generic;
using Microsoft.Data.Sqlite;
using WebApp.Models;

namespace WebApp
{
    class CreateTables
    {
        public static SqliteConnection connection = new SqliteConnection("Data Source=app.db");

        public static void CreateSetTable()
        {
            connection.Open();
            SqliteCommand command = new SqliteCommand();
            command.Connection = connection;
            command.CommandText = "CREATE TABLE TestSet(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,  Name TEXT NOT NULL, CountOfCards INTEGER NOT NULL)";
            command.ExecuteNonQuery();
            connection.Close();
        }

        public static void AddData()
        {
            connection.Open();
            SqliteCommand command = new SqliteCommand();
            command.Connection = connection;
            command.CommandText = "INSERT INTO TestSet (Name, CountOfCards) VALUES ('Путешествие1', 160)";
            command.ExecuteNonQuery();
            connection.Close();
        }

        public static List<List<object>> GetDate()
        {
            connection.Open();
            SqliteCommand command = new SqliteCommand();
            command.Connection = connection;
            command.CommandText = "SELECT * FROM TestSet";
            SqliteDataReader reader = command.ExecuteReader();
            var res = new List<List<object>>();
            while (reader.Read())   // построчно считываем данные
            {
                res.Add(new List<object>{
               reader.GetValue(0),
                reader.GetValue(1),
                reader.GetValue(2)});
            }
            return res;
        }
    }
}