using System;
using System.IO;
using System.Text.Json;

class Reservation
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Date { get; set; }
    public string Time { get; set; }
    public bool Confirmed { get; set; }
    public DateTime CreatedAt { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        string filePath = args.Length > 0 ? args[0] : "data/reservations.json";
        
        try
        {
            string json = File.ReadAllText(filePath);
            var reservations = JsonSerializer.Deserialize<Reservation[]>(json);
            
            Console.WriteLine($"Total réservations: {reservations.Length}");
            int confirmed = reservations.Count(r => r.Confirmed);
            Console.WriteLine($"Confirmées: {confirmed}");
            Console.WriteLine($"En attente: {reservations.Length - confirmed}");
            
            // Statistiques par date
            var dateGroups = reservations.GroupBy(r => r.Date);
            Console.WriteLine("Réservations par date:");
            foreach (var group in dateGroups.OrderBy(g => g.Key))
            {
                Console.WriteLine($"  {group.Key}: {group.Count()}");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erreur: {e.Message}");
        }
    }
}