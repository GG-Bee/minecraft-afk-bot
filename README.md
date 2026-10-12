# AFKGuard Mineflayer

Bot für `gastroistgeil.play.hosting:25577`. Er schaut sich um, bewegt sich gelegentlich und versucht nach Verbindungsabbrüchen erneut zu verbinden.

## Wichtiger Hosting-Hinweis
Dieser Bot benötigt einen dauerhaft laufenden Node.js-Prozess und eine dauerhafte TCP-Verbindung. **Vercel Functions sind nicht für einen 24/7-Minecraft-Client geeignet**, da jede Function eine maximale Laufzeit hat und danach beendet wird. Siehe [Vercel-Dokumentation](https://vercel.com/docs/functions/configuring-functions/duration). Nutze einen Host, der dauerhaft laufende Node.js-Prozesse oder Container unterstützt. Kostenlose Angebote können schlafen gehen oder Nutzungslimits haben.

## Lokal starten
Node.js 20 oder neuer installieren, dann:
```bash
npm install
npm start
```

## Umgebungsvariablen
- `MC_HOST`: Hostname (Standard: `gastroistgeil.play.hosting`)
- `MC_PORT`: Port (Standard: `25577`)
- `MC_USERNAME`: Botname (Standard: `AFKGuard`)
- `MC_AUTH`: `offline`, wenn der Server Offline-Mode-Clients akzeptiert. Bei Online-Mode ist ein echtes Microsoft-authentifiziertes Minecraft-Konto nötig.
- `MC_VERSION`: optional, genaue Minecraft-Version; leer = automatische Erkennung.

## Hinweise
Der Bot umgeht keine Serverregeln, Anti-Bot-Plugins oder Hosting-Abschaltregeln. Wenn der Server Online-Mode nutzt, wird `MC_AUTH=offline` abgelehnt. Beachte die Regeln des Servers und Hosters.
