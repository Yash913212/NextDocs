---
title: Installation
description: How to install and set up NextDocs
---

# Installation

This guide will walk you through installing and setting up NextDocs on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18 or later
- npm or yarn
- Docker (optional, for containerized deployment)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nextdocs.git
cd nextdocs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

Edit the environment variables as needed:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_NAME=NextDocs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Installation

For production deployment, use Docker:

```bash
docker-compose up --build -d
```

The application will be available at http://localhost:3000

## Next Steps

- Read the [Configuration Guide](configuration)
- Explore [Quick Start](quick-start) examples
- Learn about [Customization](customization)
