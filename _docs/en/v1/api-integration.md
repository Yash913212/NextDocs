---
title: API Integration
description: Learn how to integrate with APIs
---

# API Integration

Learn how to integrate your documentation with external APIs and services.

## Overview

NextDocs provides seamless integration with REST APIs and OpenAPI specifications.

## REST API Example

```javascript
async function fetchData() {
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()
  return data
}
```

## OpenAPI Integration

View the full API reference at the [API Reference](/en/api-reference) page.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "version": "1.0.0"
  }
}
```

## Authentication

Example of authenticated API calls:

```javascript
const headers = {
  'Authorization': 'Bearer YOUR_TOKEN',
  'Content-Type': 'application/json'
}

fetch('https://api.example.com/protected', { headers })
```
