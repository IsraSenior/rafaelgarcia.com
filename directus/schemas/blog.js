/**
 * Schema para la colección de Blog Posts
 *
 * Esta estructura define todos los campos necesarios para los artículos del blog
 */

export const blogCollection = {
  collection: 'blog_posts',
  meta: {
    collection: 'blog_posts',
    icon: 'article',
    note: 'Artículos del blog sobre transformación personal, respiración holotrópica y bienestar',
    display_template: '{{title}}',
    hidden: false,
    singleton: false,
    translations: [
      {
        language: 'es-ES',
        translation: 'Artículos del Blog'
      }
    ],
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'draft',
    sort_field: 'sort'
  },
  schema: {
    name: 'blog_posts'
  }
}

export const blogFields = [
  // ID (auto-generado por Directus)
  {
    field: 'id',
    type: 'integer',
    meta: {
      hidden: true,
      readonly: true,
      interface: 'input',
      special: ['uuid']
    },
    schema: {
      is_primary_key: true,
      has_auto_increment: true
    }
  },

  // Estado del artículo
  {
    field: 'status',
    type: 'string',
    meta: {
      width: 'full',
      options: {
        choices: [
          { text: 'Borrador', value: 'draft' },
          { text: 'Publicado', value: 'published' },
          { text: 'Archivado', value: 'archived' }
        ]
      },
      interface: 'select-dropdown',
      display: 'labels',
      display_options: {
        choices: [
          { text: 'Borrador', value: 'draft', foreground: '#FFFFFF', background: '#6B7280' },
          { text: 'Publicado', value: 'published', foreground: '#FFFFFF', background: '#16A34A' },
          { text: 'Archivado', value: 'archived', foreground: '#FFFFFF', background: '#DC2626' }
        ]
      }
    },
    schema: {
      default_value: 'draft',
      is_nullable: false
    }
  },

  // Orden manual
  {
    field: 'sort',
    type: 'integer',
    meta: {
      interface: 'input',
      hidden: true
    },
    schema: {
      default_value: null,
      is_nullable: true
    }
  },

  // Título del artículo
  {
    field: 'title',
    type: 'string',
    meta: {
      width: 'full',
      interface: 'input',
      required: true,
      options: {
        placeholder: 'Título del artículo'
      }
    },
    schema: {
      is_nullable: false
    }
  },

  // Slug (URL amigable)
  {
    field: 'slug',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      required: true,
      note: 'URL amigable del artículo (ej: mi-primer-articulo)',
      options: {
        slug: true,
        placeholder: 'slug-del-articulo'
      }
    },
    schema: {
      is_nullable: false,
      is_unique: true
    }
  },

  // Extracto/Resumen
  {
    field: 'excerpt',
    type: 'text',
    meta: {
      width: 'full',
      interface: 'input-multiline',
      options: {
        placeholder: 'Breve descripción del artículo...'
      },
      note: 'Resumen breve que aparecerá en listados y vista previa'
    },
    schema: {
      is_nullable: true
    }
  },

  // Contenido principal
  {
    field: 'content',
    type: 'text',
    meta: {
      width: 'full',
      interface: 'input-rich-text-html',
      required: true,
      options: {
        toolbar: [
          'bold',
          'italic',
          'underline',
          'h1',
          'h2',
          'h3',
          'numlist',
          'bullist',
          'blockquote',
          'link',
          'code',
          'image'
        ]
      }
    },
    schema: {
      is_nullable: false
    }
  },

  // Imagen destacada
  {
    field: 'featured_image',
    type: 'string',
    meta: {
      width: 'full',
      interface: 'input',
      note: 'URL de la imagen principal del artículo',
      options: {
        placeholder: 'https://example.com/imagen.jpg'
      }
    },
    schema: {
      is_nullable: true
    }
  },

  // Autor
  {
    field: 'author',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      options: {
        placeholder: 'Nombre del autor'
      }
    },
    schema: {
      default_value: 'Rafael García',
      is_nullable: true
    }
  },

  // Avatar del autor
  {
    field: 'author_avatar',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      note: 'URL del avatar del autor',
      options: {
        placeholder: 'https://example.com/avatar.jpg'
      }
    },
    schema: {
      is_nullable: true
    }
  },

  // Tags/Etiquetas (formato JSON array)
  {
    field: 'tags',
    type: 'json',
    meta: {
      width: 'full',
      interface: 'tags',
      options: {
        placeholder: 'Añadir etiquetas...',
        allowCustom: true,
        presetColors: [
          { text: 'Respiración', value: 'respiracion', color: '#42a8fc' },
          { text: 'Meditación', value: 'meditacion', color: '#16A34A' },
          { text: 'Emociones', value: 'emociones', color: '#fe8441' },
          { text: 'Transformación', value: 'transformacion', color: '#8B5CF6' },
          { text: 'Bienestar', value: 'bienestar', color: '#EC4899' }
        ]
      }
    },
    schema: {
      is_nullable: true
    }
  },

  // Fecha de creación
  {
    field: 'date_created',
    type: 'timestamp',
    meta: {
      width: 'half',
      interface: 'datetime',
      readonly: true,
      hidden: true,
      special: ['date-created']
    },
    schema: {
      is_nullable: true
    }
  },

  // Fecha de actualización
  {
    field: 'date_updated',
    type: 'timestamp',
    meta: {
      width: 'half',
      interface: 'datetime',
      readonly: true,
      hidden: true,
      special: ['date-updated']
    },
    schema: {
      is_nullable: true
    }
  },

  // Fecha de publicación
  {
    field: 'date_published',
    type: 'timestamp',
    meta: {
      width: 'half',
      interface: 'datetime',
      note: 'Fecha y hora de publicación del artículo',
      options: {
        includeSeconds: false
      }
    },
    schema: {
      is_nullable: true
    }
  },

  // Lectura estimada (en minutos)
  {
    field: 'reading_time',
    type: 'integer',
    meta: {
      width: 'half',
      interface: 'input',
      options: {
        placeholder: '5'
      },
      note: 'Tiempo estimado de lectura en minutos'
    },
    schema: {
      default_value: 5,
      is_nullable: true
    }
  },

  // SEO - Meta Title
  {
    field: 'meta_title',
    type: 'string',
    meta: {
      width: 'full',
      interface: 'input',
      options: {
        placeholder: 'Título para SEO (opcional, usa el título del artículo por defecto)'
      },
      note: 'Si está vacío, se usa el título del artículo'
    },
    schema: {
      is_nullable: true
    }
  },

  // SEO - Meta Description
  {
    field: 'meta_description',
    type: 'text',
    meta: {
      width: 'full',
      interface: 'input-multiline',
      options: {
        placeholder: 'Descripción para SEO (opcional, usa el excerpt por defecto)'
      },
      note: 'Si está vacío, se usa el excerpt del artículo'
    },
    schema: {
      is_nullable: true
    }
  }
]
