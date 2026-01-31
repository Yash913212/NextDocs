---
title: Quick Start
description: Get up and running with NextDocs in minutes
---

# Quick Start

Get your documentation portal running in just a few minutes.

## Basic Setup

### Step 1: Create Your First Document

Add a new Markdown file in the `_docs` directory:

```markdown
---
title: My First Page
description: This is my first documentation page
---

# My First Page

Hello, NextDocs!
```

### Step 2: Add Code Examples

Include syntax-highlighted code blocks:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`)
  return `Welcome to NextDocs`
}

greet('Developer')
```

```python
def greet(name):
    print(f"Hello, {name}!")
    return "Welcome to NextDocs"

greet("Developer")
```

### Step 3: Organize Content

Structure your documentation with headings:

## Main Topic

### Subtopic 1

Content for subtopic 1

### Subtopic 2

Content for subtopic 2

## Working with Features

### Search

Use the search bar (Cmd/Ctrl + K) to quickly find content across all documentation.

### Theme Toggle

Switch between light and dark modes using the theme toggle in the header.

### Version Selector

Access different versions of the documentation using the version selector dropdown.

## Tips & Tricks

1. **Table of Contents**: The TOC on the right automatically highlights the current section
2. **Copy Code**: Click the copy button on any code block to copy to clipboard
3. **Feedback**: Use the feedback widget at the bottom of each page
4. **Edit on GitHub**: Click the "Edit this page" link to contribute

## Next Steps

- Explore [Advanced Features](advanced-features)
- Learn about [API Integration](api-integration)
- Read the [Configuration Guide](configuration)
