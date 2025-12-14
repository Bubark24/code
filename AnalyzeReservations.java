import java.io.FileReader;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;

class Reservation {
    long id;
    String name;
    String email;
    String date;
    String time;
    boolean confirmed;
    String createdAt;
}

public class AnalyzeReservations {
    public static void main(String[] args) {
        String filePath = args.length > 0 ? args[0] : "data/reservations.json";
        
        try {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Reservation>>(){}.getType();
            List<Reservation> reservations = gson.fromJson(new FileReader(filePath), listType);
            
            System.out.println("Total réservations: " + reservations.size());
            long confirmed = reservations.stream().filter(r -> r.confirmed).count();
            System.out.println("Confirmées: " + confirmed);
            System.out.println("En attente: " + (reservations.size() - confirmed));
            
            // Statistiques par date
            Map<String, Long> dateCounts = reservations.stream()
                .collect(Collectors.groupingBy(r -> r.date, Collectors.counting()));
            
            System.out.println("Réservations par date:");
            dateCounts.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> System.out.println("  " + entry.getKey() + ": " + entry.getValue()));
                
        } catch (Exception e) {
            System.out.println("Erreur: " + e.getMessage());
        }
    }
}