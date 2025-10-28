# Directus Schema & Data Management

Esta carpeta contiene toda la configuración, schemas y scripts para gestionar la estructura de datos de Directus de forma programática y versionada.

## Estructura

```
directus/
├── schemas/          # Definición de colecciones y campos
│   └── blog.js      # Schema del blog
├── scripts/          # Scripts de creación y seed
│   ├── 01-create-blog-collection.js
│   └── 02-seed-blog-data.js
└── README.md        # Esta documentación
```

## Requisitos previos

1. **Directus instalado y corriendo**
   - Asegúrate de tener Directus configurado y accesible

2. **Variables de entorno configuradas**
   ```bash
   DIRECTUS_URL=https://tu-directus.com
   DIRECTUS_ADMIN_TOKEN=tu-token-de-admin
   ```

3. **Obtener token de administrador**
   - Inicia sesión en Directus Admin
   - Ve a Settings → Access Tokens
   - Crea un nuevo token con rol "Administrator"
   - Copia el token y agrégalo al `.env`

## Uso

### 1. Crear la colección de Blog

Este script crea la colección `blog_posts` con todos sus campos:

```bash
node directus/scripts/01-create-blog-collection.js
```

**Qué hace:**
- Crea la colección `blog_posts`
- Define 20+ campos incluyendo:
  - Información básica (título, slug, excerpt, contenido)
  - Metadata (autor, tags, fechas)
  - SEO (meta_title, meta_description)
  - Imágenes (featured_image, author_avatar)
  - Control (status, sort, reading_time)

### 2. Insertar datos de prueba

Una vez creada la colección, inserta posts de ejemplo:

```bash
node directus/scripts/02-seed-blog-data.js
```

**Qué hace:**
- Inserta 4 posts de prueba
- 3 publicados y 1 en borrador
- Contenido completo en HTML
- Tags y metadata incluidos

## Schema del Blog

### Campos principales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | integer | ID auto-generado |
| `status` | string | Estado: draft/published/archived |
| `title` | string | Título del artículo |
| `slug` | string | URL amigable (único) |
| `excerpt` | text | Resumen breve |
| `content` | text | Contenido HTML completo |
| `featured_image` | uuid | Imagen principal |
| `author` | string | Nombre del autor |
| `author_avatar` | uuid | Foto del autor |
| `tags` | json | Array de etiquetas |
| `date_published` | timestamp | Fecha de publicación |
| `reading_time` | integer | Minutos de lectura estimados |
| `meta_title` | string | Título SEO |
| `meta_description` | text | Descripción SEO |

### Estados disponibles

- **draft**: Borrador (no visible públicamente)
- **published**: Publicado (visible en el sitio)
- **archived**: Archivado (no visible, pero conservado)

### Tags predefinidos

- Respiración (azul #42a8fc)
- Meditación (verde #16A34A)
- Emociones (naranja #fe8441)
- Transformación (morado #8B5CF6)
- Bienestar (rosa #EC4899)

## Conectar con el Frontend

### Actualizar useDirectus.js

El composable ya está configurado para consumir posts. Solo necesitas actualizar la función si requieres campos adicionales:

```javascript
const getPosts = async (params = {}) => {
  const response = await fetch(
    `${config.public.directusUrl}/items/blog_posts?${new URLSearchParams({
      filter: JSON.stringify({ status: { _eq: 'published' } }),
      sort: '-date_published',
      ...params
    })}`
  )
  return response.json()
}
```

### Usar en las páginas

```javascript
// En pages/blog/index.vue
const { getPosts } = useDirectus()
const { data: posts } = await useAsyncData('blog-posts', () => getPosts())
```

```javascript
// En pages/blog/[id].vue
const { getPostBySlug } = useDirectus()
const { data: post } = await useAsyncData(
  `post-${route.params.id}`,
  () => getPostBySlug(route.params.id)
)
```

## Próximos pasos

Una vez que el blog esté funcionando:

1. **Eventos**: Crear colección para eventos
2. **Testimonios**: Crear colección para testimonios
3. **Equipo**: Crear colección para miembros del equipo
4. **Servicios**: Crear colección para servicios
5. **Newsletter**: Crear colección para suscriptores

## Troubleshooting

### Error: "Collection already exists"
- Es normal si ejecutas el script dos veces
- El script continuará y creará solo los campos faltantes

### Error: "Unauthorized"
- Verifica que el token en `.env` sea correcto
- Asegúrate de que sea un token de administrador
- Revisa que `DIRECTUS_URL` no tenga `/` al final

### Error: "Field already exists"
- Es normal si ejecutas el script dos veces
- El script lo reportará pero continuará con los demás campos

## URLs para imágenes de prueba en seeds

Para mantener consistencia en los datos de prueba, usa estas URLs:

### Imágenes destacadas / Featured Images
```javascript
featured_image: 'https://picsum.photos/800/800?random=1'
// Cambia el número random para diferentes imágenes: ?random=1, ?random=2, etc.
```

### Avatares de usuarios
```javascript
author_avatar: 'https://avatar.iran.liara.run/public/48'
// También disponible en diferentes tamaños: /public/32, /public/64, /public/128
```

### Ejemplo en un seed:
```javascript
{
  title: 'Mi artículo',
  author: 'Rafael García',
  author_avatar: 'https://avatar.iran.liara.run/public/48',
  featured_image: 'https://picsum.photos/800/800?random=1',
  // ... resto de campos
}
```

## Notas importantes

⚠️ **No ejecutar en producción sin backup**: Estos scripts crean estructura. Siempre haz backup antes de ejecutar en producción.

✅ **Versionado en Git**: Toda esta estructura está versionada, lo que permite recrear el schema en cualquier ambiente.

📝 **Documentación viviente**: Los schemas en `schemas/` son la documentación oficial de la estructura de datos.

🔄 **Idempotente**: Los scripts se pueden ejecutar múltiples veces sin romper nada (ignoran elementos duplicados).
