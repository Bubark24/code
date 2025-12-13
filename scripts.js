document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            background: 'linear-gradient(135deg, #e85d3f, #3ecf8e)',
            color: 'white',
            padding: '12px 18px',
            borderRadius: '10px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 2000,
            fontWeight: '600'
        });
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function parseTime(t) {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    }

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = form.querySelector('[name="name"]')?.value?.trim();
            const email = form.querySelector('[name="email"]')?.value?.trim();
            const date = form.querySelector('[name="date"]')?.value;
            const time = form.querySelector('[name="time"]')?.value;

            if (!name || !email || !date || !time) {
                showToast('Veuillez remplir tous les champs requis.');
                return;
            }

            const today = new Date();
            const selected = new Date(date + 'T' + time);
            if (isNaN(selected.getTime())) {
                showToast('Date ou heure invalide.');
                return;
            }

            // Ne pas autoriser les réservations dans le passé
            if (selected < today) {
                showToast('La date/heure sélectionnée est dans le passé.');
                return;
            }

            // Heures d'ouverture: 11:30 (690) - 23:00 (1380)
            const minutes = parseTime(time);
            if (minutes < 11 * 60 + 30 || minutes > 23 * 60) {
                showToast('Heures d\u00e9gales: 11:30 - 23:00. Choisissez une heure dans cet intervalle.');
                return;
            }

            const reservation = {
                name,
                email,
                date,
                time,
                reservedAt: new Date().toISOString()
            };

            try {
                const stored = JSON.parse(localStorage.getItem('reservations') || '[]');
                stored.push(reservation);
                localStorage.setItem('reservations', JSON.stringify(stored));
            } catch (e) {
                console.error('Erreur stockage local', e);
            }

            // tenter de synchroniser avec le serveur (silencieux si hors-ligne)
            fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)
            })
            .then(r => r.json())
            .then(data => {
                if (data && data.ok) {
                    showToast('Réservation enregistrée sur le serveur.');
                } else {
                    showToast('Réservation enregistrée localement.');
                }
            })
            .catch(err => {
                console.warn('Envoi serveur échoué', err);
                showToast('Réservation enregistrée localement (pas de connexion serveur).');
            })
            .finally(() => form.reset());
        });
    });
});

