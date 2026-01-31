---
title: Installation
description: Installation guide for NextDocs
---

# Installation

Installer et configurer NextDocs sur votre machine locale.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- Node.js 18 ou version ultérieure
- npm ou yarn
- Docker (optionnel)

## Étapes d'Installation

### 1. Cloner le Dépôt

```bash
git clone https://github.com/votreusername/nextdocs.git
cd nextdocs
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Configurer l'Environnement

Créez un fichier `.env.local` à partir de l'exemple:

```bash
cp .env.example .env.local
```

## Installation avec Docker

Pour un déploiement en production, utilisez Docker:

```bash
docker-compose up --build -d
```

L'application sera disponible sur http://localhost:3000
