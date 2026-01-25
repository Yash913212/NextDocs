---
title: Empezando
description: Guía de inicio rápido para NextDocs
---

# Empezando con NextDocs

Esta guía te ayudará a comenzar con NextDocs en minutos.

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- Node.js 18 o superior
- npm o gestor de paquetes yarn
- Un editor de código (VS Code recomendado)
- Comprensión básica de Next.js

## Instalación

### Configuración Local

1. Clona el repositorio:

```bash
git clone https://github.com/yourusername/nextdocs.git
cd nextdocs
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador y navega a:

```
http://localhost:3000
```

### Configuración con Docker

1. Construye y ejecuta con Docker Compose:

```bash
docker-compose up --build
```

2. Accede a la aplicación en:

```
http://localhost:3000
```

## Estructura del Proyecto

```
nextdocs/
├── app/              # Directorio de aplicación Next.js
├── components/       # Componentes reutilizables
├── _docs/           # Contenido de documentación
├── lib/             # Utilidades y helpers
├── public/          # Activos estáticos
└── ...
```

## Tu Primera Página de Documentación

Las páginas de documentación se escriben en Markdown y se almacenan en el directorio `_docs`.

### Organización de Archivos

```
_docs/
├── en/              # Documentación en inglés
│   ├── v1/         # Versión 1
│   ├── v2/         # Versión 2
│   └── v3/         # Versión 3
├── es/             # Documentación en español
├── fr/             # Documentación en francés
└── de/             # Documentación en alemán
```

### Crear una Nueva Página

1. Crea un nuevo archivo Markdown en el directorio apropiado:

```bash
touch _docs/es/v1/mi-pagina.md
```

2. Agrega metadatos en el encabezado:

```yaml
---
title: Título de Mi Página
description: Breve descripción de la página
---

# Contenido de la Página

Tu contenido va aquí...
```

3. La página estará disponible automáticamente en:

```
/es/docs/v1/mi-pagina
```

## Características de Markdown

NextDocs admite Markdown completo con resaltado de sintaxis:

### Encabezados

```markdown
# Encabezado H1
## Encabezado H2
### Encabezado H3
```

### Listas

```markdown
- Elemento 1
- Elemento 2
  - Elemento anidado

1. Primero
2. Segundo
3. Tercero
```

### Bloques de Código

```javascript
function saludar(nombre) {
  console.log(`¡Hola, ${nombre}!`);
}

saludar('NextDocs');
```

## Soporte Multilingüe

Para agregar una página en un idioma diferente:

1. Crea el archivo en el directorio de idioma apropiado:

```bash
touch _docs/es/v1/mi-pagina.md
```

2. Usa el mismo slug pero crea traducciones:

```yaml
---
title: Mi Título de Página
description: Breve descripción de la página
---

# Contenido en Español
```

3. Accede a través de:

```
/es/docs/v1/mi-pagina
```

## Personaliza Tu Documentación

### Actualizar Metadatos del Sitio

Edita `.env` para personalizar la información del sitio:

```env
NEXT_PUBLIC_SITE_NAME=MiDocumentación
NEXT_PUBLIC_SITE_URL=https://docs.example.com
```

### Agregar Estilos Personalizados

Modifica `app/globals.css` para personalizar colores y estilos.

### Cambiar Traducciones

Actualiza los archivos de traducción en `public/locales/`:

```
public/locales/
├── en/common.json
├── es/common.json
├── fr/common.json
└── de/common.json
```

## Construcción para Producción

1. Construye la aplicación:

```bash
npm run build
```

2. Inicia el servidor de producción:

```bash
npm start
```

## Despliegue

### Despliegue con Docker

Construye la imagen de Docker:

```bash
docker build -t nextdocs:latest .
```

Ejecuta el contenedor:

```bash
docker run -p 3000:3000 nextdocs:latest
```

### Despliegue en la Nube

NextDocs se puede desplegar en:
- Vercel (recomendado para Next.js)
- AWS
- Google Cloud
- Azure
- Cualquier plataforma compatible con Node.js

## Solución de Problemas

### Puerto Ya en Uso

Si el puerto 3000 ya está en uso:

```bash
npm run dev -- -p 3001
```

### La Construcción Falla

Limpia la caché e reinstala:

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

*¡Feliz documentación!*
