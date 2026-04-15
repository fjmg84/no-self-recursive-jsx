# no-self-recursive

Una regla ESLint que previene que componentes React se rendericen a sí mismos de forma recursiva, evitando bucles infinitos y comportamientos inesperados.

## Descripción

Esta regla detecta dos tipos de auto-recursión en componentes React:

1. **Auto-referencia en JSX**: Cuando un componente intenta renderizarse a sí mismo usando JSX
2. **Llamadas directas**: Cuando un componente se llama a sí mismo como una función

La regla funciona con:

- ✅ JavaScript (`.js`)
- ✅ JSX (`.jsx`)
- ✅ TypeScript (`.ts`)
- ✅ TypeScript con JSX (`.tsx`)

## Instalación

```bash
npm install --save-dev no-self-recursive
# o
pnpm add -D no-self-recursive
```

## Configuración

En tu archivo `.eslintrc.json`:

```json
{
  "plugins": ["no-self-recursive"],
  "rules": {
    "no-self-recursive/no-self-recursive": "error"
  }
}
```

O en `.eslintrc.js`:

```javascript
module.exports = {
  plugins: ["no-self-recursive"],
  rules: {
    "no-self-recursive/no-self-recursive": "error",
  },
};
```

## Ejemplos

### ❌ Inválido

#### Auto-referencia en JSX (arrow function)

```jsx
const Component = () => <Component prop={false} />;
```

Error: _The component 'Component' renders itself in JSX, which can cause infinite recursion._

#### Auto-referencia en JSX (function declaration)

```jsx
function Component() {
  return <Component className="component" name="component" />;
}
```

Error: _The component 'Component' renders itself in JSX, which can cause infinite recursion._

#### Llamada directa a la función

```jsx
const Component = () => Component();
```

Error: _The component 'Component' calls itself, which can cause infinite recursion._

#### Llamada recursiva en function declaration

```jsx
function Component() {
  return Component();
}
```

Error: _The component 'Component' calls itself, which can cause infinite recursion._

#### Auto-referencia anidada

```jsx
function Component() {
  const Child = () => <Child />;
  return <Child />;
}
```

Error: _The component 'Child' renders itself in JSX, which can cause infinite recursion._

### ✅ Válido

#### Componentes diferentes

```jsx
const Child = () => <div>Child</div>;
const Parent = () => <Child />;
```

#### Sin JSX

```jsx
const Component = () => <h1>Hello World</h1>;
```

#### Componentes lowercase (no son componentes React)

```jsx
const Component = () => <lowercase-component prop={true} />;
```

#### Múltiples componentes

```jsx
const App = () => <Component prop={false} />;
```

## Cómo funciona

La regla analiza el árbol de sintaxis abstracta (AST) en busca de:

1. **`JSXOpeningElement`**: Elementos JSX que podrían ser auto-referencias
2. **`CallExpression`**: Llamadas a funciones que podrían ser recursivas

Para cada nodo detectado:

- Obtiene el nombre del componente actual buscando el ancestro más cercano que sea una función con nombre en PascalCase
- Comprueba si el elemento/llamada coincide con el nombre del componente
- Si coinciden, reporta un error

### Detecta solo componentes React

La regla utiliza la convención **PascalCase** para identificar componentes React:

- ✅ `Component`, `MyComponent`, `App` → Detectados
- ❌ `button`, `input`, `customElement` → Ignorados (elementos HTML/nativos)

## Compatibilidad

| Entorno                     | Soportado |
| --------------------------- | --------- |
| JavaScript/JSX              | ✅ Sí     |
| TypeScript                  | ✅ Sí     |
| TypeScript con JSX (`.tsx`) | ✅ Sí     |
| Babel                       | ✅ Sí     |

## Reglas relacionadas

- [`react/no-direct-mutation-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md) - Evita mutaciones directas de estado
- [`react-hooks/exhaustive-deps`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) - Gestiona dependencias en hooks

## Licencia

ISC
