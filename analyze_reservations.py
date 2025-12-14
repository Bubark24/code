#!/usr/bin/env python3
# Script Python pour analyser les réservations
import json
import sys
from datetime import datetime

def analyze_reservations(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reservations = json.load(f)
        
        total = len(reservations)
        confirmed = sum(1 for r in reservations if r.get('confirmed', False))
        pending = total - confirmed
        
        print(f"Total réservations: {total}")
        print(f"Confirmées: {confirmed}")
        print(f"En attente: {pending}")
        
        # Statistiques par date
        dates = {}
        for r in reservations:
            date = r.get('date', 'N/A')
            dates[date] = dates.get(date, 0) + 1
        
        print("Réservations par date:")
        for date, count in sorted(dates.items()):
            print(f"  {date}: {count}")
            
    except Exception as e:
        print(f"Erreur: {e}")
        sys.exit(1)

if __name__ == "__main__":
    file_path = sys.argv[1] if len(sys.argv) > 1 else 'data/reservations.json'
    analyze_reservations(file_path)