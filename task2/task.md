Simulieren Sie eine Warteschlange mit 3 Quellen und zufällig
verteilten Paketgrößen. Plotten Sie die durchschnittliche Zeit
bis zur Übertragung als Funktion der Paketgröße. Nutzen Sie
dafür Round Robin und Fair Queueing. 

Wählen Sie eine Ihrer zwei zufälligen Sprachen.

- Größe: 64-1500 Bytes
- x-Achse: Paketgröße
- y-Achse: Übertragungszeit (von Ankunft beim Empfänger bis Durchgeleitet)
- 3 Quellen hängen am Empfänger an der gleichen Warteschlange

Round Robin:
- Ein Paket aus jeder Quelle
- Bevorzugt große Pakete
Fair Queueing:
- Das Paket zuerst, das zuerst fertig gewesen wäre, wenn es bei seiner Ankunftszeit gestartet wäre.
- Annäherung an Multiplexing auf Byte-Ebene.
- Mehr Rechenaufwand, auf sehr schnellen Leitungen zu viel