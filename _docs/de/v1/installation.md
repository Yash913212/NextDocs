---
title: Installation
description: Installationsanleitung für NextDocs
---

# Installation

Dieser Leitfaden führt Sie durch die Installation und Einrichtung von NextDocs auf Ihrem lokalen Computer.

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- Node.js 18 oder höher
- npm oder yarn
- Docker (optional)

## Installationsschritte

### 1. Repository Klonen

```bash
git clone https://github.com/ihrbenutzer/nextdocs.git
cd nextdocs
```

### 2. Abhängigkeiten Installieren

```bash
npm install
```

### 3. Umgebung Konfigurieren

Erstellen Sie eine `.env.local` Datei aus dem Beispiel:

```bash
cp .env.example .env.local
```

## Docker Installation

Für die Produktionsbereitstellung verwenden Sie Docker:

```bash
docker-compose up --build -d
```

Die Anwendung ist unter http://localhost:3000 verfügbar
