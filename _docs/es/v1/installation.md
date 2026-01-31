---
title: Installation
description: Cómo instalar y configurar NextDocs
---

# Instalación

Esta guía te llevará a través de la instalación y configuración de NextDocs en tu máquina local.

## Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- Node.js 18 o posterior
- npm o yarn
- Docker (opcional, para implementación en contenedores)

## Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/nextdocs.git
cd nextdocs
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar el Entorno

Crea un archivo `.env.local` desde el ejemplo:

```bash
cp .env.example .env.local
```

## Instalación con Docker

Para implementación en producción, usa Docker:

```bash
docker-compose up --build -d
```

La aplicación estará disponible en http://localhost:3000
