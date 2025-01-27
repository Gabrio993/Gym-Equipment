# Gym-Equipment

Web application per la gestione delle prenotazioni di attrezzature sportive all’interno di una palestra.

## Descrizione Del Progetto

L’applicazione fornisce la possibilità di visualizzare le attrezzature disponibili e consente la prenotazione delle stesse,  
specificando una durata (max 20 minuti).

Vi è inoltre la possibilità di registrarsi come nuovo utente e di effettuare successivemnte un login.

## Funzionalità Principali

- Visualizzazione delle attrezzature: Tramite chiamate API, è possibile ottenere la lista delle attrezzature disponibili.

- Prenotazione: Ogni utente, loggato o meno, può prenotare una o più attrezzature per una durata massima di 20 minuti.

- Gestione delle prenotazioni: Gli utenti non loggati possono vedere tutte le prenotazioni effettuate. Gli utenti loggati possono visualizzare esclusivamente le proprie prenotazioni.

- Autenticazione e Registrazione: Gli utenti possono registrarsi e accedere con il proprio account.

- Pagina 404 Not Found: Animazione tramite Framer Motion per migliorare l’esperienza utente.

## Scelte Implementative

- Stack Tecnologico:

  - Utilizzo di **React** con **Vite** per un'ottimizzazione dello sviluppo.

  - **TypeScript** per una maggiore robustezza del codice grazie alla definizione di **tipi** e **interfacce**.

- Librerie:

  - **Tailwind CSS**: Utilizzato per uno styling modulare, efficiente e responsive.

  - **Framer Motion**: Implementato nella pagina 404 per animazioni e migliorare la UX/UI.

## Struttura del progettto

```plaintext
�   main.tsx            // Punto d'ingresso principale dell'applicazione
�   App.tsx             // Componente di primo livello dell'applicazione
�
+---App                 // Gestisce la la visualizzazione delle rotte e il rendering condizionale di navabar e footer
�       AppContent.tsx
�
�
�
+---components          // Contiene tutti i componenti React
�   +---Bookings
�   �       Booking.css
�   �       Bookings.tsx
�   �
�   +---Footer
�   �       Footer.css
�   �       Footer.tsx
�   �
�   +---Home
�   �       Home.css
�   �       Home.tsx
�   �
�   +---Login
�   �       Login.css
�   �       Login.tsx
�   �
�   +---Navbar
�   �       Navbar.css
�   �       Navbar.tsx
�   �
�   +---NotFound
�   �       NotFound.tsx
�   �
�   +---Register
�           Register.tsx
�
+---hooks                   // Contiene tutti i custom hooks per la gestione della logica riutilizzabile
�       useBookings.ts
�       useHome.ts
�       useLogin.ts
�       useNavbar.ts
�       useRegister.ts
�
+---Routes                  // Contiene il file routes.config.tsx con la configurazione delle rotte.
�       Routes.config.tsx
�
+---services                // Contiene il file api.ts per la gestione delle chiamate API.
�       api.ts
�
+---types                   // Contiene i file TypeScript con le interfacce e i tipi utilizzati nell’applicazione.
        auth.ts
        booking.ts
        equipment.ts
        home.ts
        login.ts
        navbar.ts
        register.ts
```

## Implementazione delle rotte

Il file `AppContent.tsx` utilizza `useLocation` e `useRoutes` di React Router per gestire le rotte  
e condizionare la visualizzazione di Navbar e Footer. Le rotte sono definite in `routes.config.tsx`  
e includono percorsi principali come `/`, `/bookings`, `/login`, e `/register`.

## Requisiti Tecnici

- **Node.js**: Versione >= 18.0.0

- **Vite**: Ambiente di sviluppo configurato per React e TypeScript.

## Istruzioni per l'avvio del progetto

1. Clonare il repository

```bash
git clone https://github.com/Gabrio993/Gym-Equipment.git
```

2. Installare le dipendenze

```bash
npm install
```

3. Avviare l’ambiente di sviluppo

```bash
npm run dev
```

4. Accedere all’applicazione tramite il browser all'indirizzo indicato  
   es: `http://localhost:5173`

## Istruzioni per generare/servire la documentazione

1. Generare la documentazione  
   Dal terminale, dalla root del progetto digitare:

```bash
   npm run generate-docs
```

2. Accedere alla documentazione  
   Dal terminale, dalla root del progetto digitare:

```bash
   npm run serve-docs
```

3. Accedere alla documentazione tramite il browser all'indirizzo indicato  
   es: ` http://localhost:4000`

## Autore

Sviluppato da Gabriele Fusco come progetto per approfondire React, TypeScript e lo sviluppo di applicazioni web moderne.
