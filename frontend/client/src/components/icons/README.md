# Icons Components

Este directorio contiene todos los componentes de iconos SVG reutilizables de la aplicación.

## 📁 Estructura

Los iconos están organizados en tres categorías:

### 🏥 Category Icons (Iconos de Categoría)
Iconos utilizados en las tarjetas de categorías de la página principal.

**Todos los iconos de categoría están consolidados en un solo archivo: `CategoryIcons.tsx`**

- **MedicosIcon** - Icono de médicos (tres figuras humanas)
- **HospitalIcon** - Icono de hospital/clínicas (casa con cruz)
- **EspecialidadesIcon** - Icono de especialidades (maletín médico)

### 🧭 Navbar Icons (Iconos de Navegación)
Iconos utilizados en la barra de navegación inferior.

**Todos los iconos del navbar están consolidados en un solo archivo: `NavbarIcons.tsx`**

- **HomeIcon** - Icono de inicio (casa)
- **EstudiosIcon** - Icono de estudios (portapapeles)
- **CalendarioIcon** - Icono de calendario
- **ChatIcon** - Icono de chat (mensaje)

### 🔧 Other Icons (Otros Iconos)
Iconos diversos utilizados en diferentes partes de la aplicación:

- **ArrowLeftIcon** - Flecha izquierda
- **ArrowRightIcon** - Flecha derecha
- **EditIcon** - Icono de edición
- **HelpIcon** - Icono de ayuda
- **LikeIcon** - Icono de me gusta
- **LockIcon** - Icono de candado
- **MonitorIcon** - Icono de monitor
- **ProfileIcon** - Icono de perfil

## 🚀 Uso

### Importación desde el Index (Recomendado)
```tsx
import { HomeIcon, ChatIcon, MedicosIcon } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <HomeIcon />
      <ChatIcon width={25} />
      <MedicosIcon className="text-blue-500" />
    </div>
  );
}
```

### Importación Directa de Archivos Consolidados
```tsx
// Desde NavbarIcons
import { HomeIcon, EstudiosIcon, CalendarioIcon, ChatIcon } from '@/components/icons/NavbarIcons';

// Desde CategoryIcons
import { MedicosIcon, HospitalIcon, EspecialidadesIcon } from '@/components/icons/CategoryIcons';

function MyComponent() {
  return (
    <>
      <HomeIcon width={30} height={30} className="my-class" />
      <MedicosIcon />
    </>
  );
}
```

## 📝 Props

Todos los componentes de iconos aceptan las siguientes props:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `width` | `number` | varía* | Ancho del icono en píxeles |
| `height` | `number` | varía* | Alto del icono en píxeles |
| `className` | `string` | - | Clases CSS adicionales |

*Los valores por defecto varían según el icono para mantener las proporciones originales.

## 🎨 Características

### CurrentColor
Los iconos de la navbar usan `fill="currentColor"`, lo que significa que heredan el color del texto de su contenedor:

```tsx
<div className="text-blue-500">
  <HomeIcon /> {/* Se verá azul */}
</div>

<div style={{ color: 'red' }}>
  <ChatIcon /> {/* Se verá rojo */}
</div>
```

### Color Fijo
Los iconos de categoría usan un color fijo (`#03ACF2`) definido en el SVG.

## ✨ Beneficios

1. **Reutilizables** - Usa el mismo icono en múltiples lugares sin duplicar código
2. **Type-Safe** - TypeScript proporciona autocompletado y validación de tipos
3. **Customizables** - Controla el tamaño y las clases CSS fácilmente
4. **Mantenibles** - Actualiza un icono en un solo lugar
5. **Tree-shakeable** - Solo se importan los iconos que usas
6. **Accesibles** - Fácil de agregar props aria-label cuando sea necesario

## 🔄 Migración desde SVG Sprites

Antes:
```tsx
<svg width={30} height={30}>
  <use href={`/assets/icons/navbarIcon-sprites.svg#home-icon`} />
</svg>
```

Ahora:
```tsx
import { HomeIcon } from '@/components/icons';

<HomeIcon width={30} height={30} />
```

## 📦 Agregar Nuevos Iconos

### Para Iconos de Categoría:
Agrega el nuevo icono al archivo `CategoryIcons.tsx`:

```tsx
export function NuevaCategoriaIcon({ width = 50, height = 50, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tu path SVG aquí */}
      <path d="..." fill="#03ACF2" />
    </svg>
  );
}
```

Luego agrégalo al `index.ts`:
```tsx
export {
  MedicosIcon,
  HospitalIcon,
  EspecialidadesIcon,
  NuevaCategoriaIcon, // <-- Agregar aquí
} from "./CategoryIcons";
```

### Para Iconos de Navbar:
Agrega el nuevo icono al archivo `NavbarIcons.tsx`:

```tsx
export function NuevoNavIcon({ width = 25, height = 25, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tu path SVG aquí */}
      <path d="..." fill="currentColor" />
    </svg>
  );
}
```

Luego agrégalo al `index.ts`:
```tsx
export {
  HomeIcon,
  EstudiosIcon,
  CalendarioIcon,
  ChatIcon,
  NuevoNavIcon, // <-- Agregar aquí
} from "./NavbarIcons";
```

### Para Otros Iconos:
1. Crea un nuevo archivo en este directorio: `NuevoIcon.tsx`
2. Usa esta plantilla:

```tsx
import React from 'react';

interface NuevoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function NuevoIcon({ 
  width = 24, 
  height = 24, 
  className 
}: NuevoIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tu path SVG aquí */}
      <path d="..." fill="currentColor" />
    </svg>
  );
}
```

3. Agrégalo al `index.ts`:
```tsx
export { default as NuevoIcon } from './NuevoIcon';
```

## 🎯 Mejores Prácticas

- ✅ Usa `currentColor` para iconos que necesitan cambiar de color dinámicamente (como los del navbar)
- ✅ Usa colores fijos (como `#03ACF2`) para iconos de categoría que mantienen su marca
- ✅ Mantén los viewBox originales del SVG
- ✅ Usa nombres descriptivos en PascalCase terminados en "Icon"
- ✅ Exporta desde el `index.ts` para importaciones limpias
- ✅ Agrupa iconos relacionados en el mismo archivo (`CategoryIcons.tsx`, `NavbarIcons.tsx`)
- ✅ Comparte interfaces cuando los iconos tienen las mismas props
- ✅ Documenta iconos complejos o con usos específicos
- ❌ No modifiques los paths SVG sin verificar el diseño original