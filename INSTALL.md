# Guía de Instalación - eslint-plugin-no-self-recursive

Esta guía te ayudará a instalar el plugin en cualquier proyecto React/TypeScript.

## ⚡ Instalación Rápida (5 minutos)

### Paso 1: Instalar el plugin

Elige UNA opción:

#### Si está publicado en npm:

```bash
npm install --save-dev eslint-plugin-no-self-recursive
```

#### Si tienes el código localmente:

```bash
npm install --save-dev /ruta/completa/al/plugin/no-self-recursive
```

#### Si está en GitHub:

```bash
npm install --save-dev github:usuario/no-self-recursive-jsx
```

### Paso 2: Agregar a `package.json` (si lo usas sin `.eslintrc`)

En la sección `eslintConfig`:

```json
{
  "eslintConfig": {
    "plugins": ["no-self-recursive"],
    "rules": {
      "no-self-recursive/no-self-recursive": "error"
    }
  }
}
```

### Paso 3: O crear/actualizar `.eslintrc.json`

```json
{
  "plugins": ["no-self-recursive"],
  "rules": {
    "no-self-recursive/no-self-recursive": "error"
  }
}
```

### Paso 4: Ejecutar ESLint

```bash
npx eslint src/
# o si tienes script en package.json:
npm run lint
```

---

## Guía Detallada por Proyecto

### 📱 Proyecto Next.js

1. **Instalar plugin:**

   ```bash
   npm install --save-dev eslint-plugin-no-self-recursive
   ```

2. **Actualizar `.eslintrc.json`:**

   ```json
   {
     "extends": "next/core-web-vitals",
     "plugins": ["no-self-recursive"],
     "rules": {
       "no-self-recursive/no-self-recursive": "error"
     }
   }
   ```

3. **Ejecutar:**
   ```bash
   npm run lint
   ```

---

### ⚛️ Proyecto Create React App (CRA)

1. **Instalar plugin:**

   ```bash
   npm install --save-dev eslint-plugin-no-self-recursive
   ```

2. **En `package.json` agregar:**

   ```json
   {
     "eslintConfig": {
       "extends": "react-app",
       "plugins": ["no-self-recursive"],
       "rules": {
         "no-self-recursive/no-self-recursive": "error"
       }
     }
   }
   ```

3. **Ejecutar:**
   ```bash
   npm run lint
   ```

---

### 🎯 Proyecto Vite + React

1. **Instalar plugin:**

   ```bash
   npm install --save-dev eslint-plugin-no-self-recursive
   ```

2. **Crear/Actualizar `.eslintrc.json`:**

   ```json
   {
     "extends": ["eslint:recommended"],
     "plugins": ["react", "no-self-recursive"],
     "env": {
       "browser": true,
       "es2021": true
     },
     "rules": {
       "no-self-recursive/no-self-recursive": "error"
     }
   }
   ```

3. **Ejecutar:**
   ```bash
   npm run lint
   ```

---

### 📘 Proyecto TypeScript

1. **Instalar plugin:**

   ```bash
   npm install --save-dev eslint-plugin-no-self-recursive
   ```

2. **Crear/Actualizar `.eslintrc.json`:**

   ```json
   {
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint", "no-self-recursive"],
     "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
     "rules": {
       "no-self-recursive/no-self-recursive": "error"
     }
   }
   ```

3. **Ejecutar:**
   ```bash
   npm run lint
   ```

---

## 🔧 Opciones Avanzadas

### Usar como warning en lugar de error

```json
{
  "plugins": ["no-self-recursive"],
  "rules": {
    "no-self-recursive/no-self-recursive": "warn"
  }
}
```

### Excluir archivos

```json
{
  "ignorePatterns": ["node_modules/", "dist/", ".next/"],
  "plugins": ["no-self-recursive"],
  "rules": {
    "no-self-recursive/no-self-recursive": "error"
  }
}
```

### Usar solo en ciertos archivos

```json
{
  "overrides": [
    {
      "files": ["src/components/**/*.tsx"],
      "plugins": ["no-self-recursive"],
      "rules": {
        "no-self-recursive/no-self-recursive": "error"
      }
    }
  ]
}
```

---

## 📊 Verificar Instalación

Ejecuta este comando para verificar que el plugin se reconoce:

```bash
npx eslint --print-config src/App.jsx | grep no-self-recursive
```

Si aparece `"no-self-recursive/no-self-recursive": "error"` (o similar), la instalación fue exitosa.

---

## ❌ Troubleshooting

### Error: "Cannot find module 'eslint-plugin-no-self-recursive'"

**Solución:**

```bash
# Verifica que está instalado
npm list eslint-plugin-no-self-recursive

# Si no aparece, reinstala
npm install --save-dev eslint-plugin-no-self-recursive
```

### Error: "Plugin not found"

**Solución:**
Check que en el `.eslintrc` usas el nombre correcto:

```json
{
  "plugins": ["no-self-recursive"],
  "rules": {
    "no-self-recursive/no-self-recursive": "error"
  }
}
```

### ESLint no detecta el plugin

**Solución:**

1. Borra `node_modules`:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Cacha de ESLint:

   ```bash
   npx eslint --cache-reset
   ```

3. Reinicia tu editor

---

## 📚 Más Información

- [Documentación ESLint Plugins](https://eslint.org/docs/extend/plugins)
- [README del Plugin](./README.md)
- [Tests del Plugin](./test/)
