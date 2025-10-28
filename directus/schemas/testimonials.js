/**
 * Schema para la colección de Testimonios
 *
 * Esta estructura define todos los campos necesarios para los testimonios del programa
 */

export const testimonialsCollection = {
  collection: 'testimonials',
  meta: {
    collection: 'testimonials',
    icon: 'format_quote',
    note: 'Testimonios de participantes del programa Camino Vital',
    display_template: '{{name}} - {{role}}',
    hidden: false,
    singleton: false,
    translations: [
      {
        language: 'es-ES',
        translation: 'Testimonios'
      }
    ],
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'draft',
    sort_field: 'sort'
  },
  schema: {
    name: 'testimonials'
  }
}

export const testimonialsFields = [
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

  // Estado del testimonio
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
      default_value: 'published',
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

  // Nombre del testimoniante
  {
    field: 'name',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      required: true,
      options: {
        placeholder: 'Nombre completo'
      }
    },
    schema: {
      is_nullable: false
    }
  },

  // Rol o profesión
  {
    field: 'role',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      options: {
        placeholder: 'Profesión o rol'
      },
      note: 'Opcional - Profesión o cargo del testimoniante'
    },
    schema: {
      is_nullable: true
    }
  },

  // Cita/Testimonio
  {
    field: 'quote',
    type: 'text',
    meta: {
      width: 'full',
      interface: 'input-multiline',
      required: true,
      options: {
        placeholder: 'Escribe aquí el testimonio...'
      },
      note: 'El testimonio completo del participante'
    },
    schema: {
      is_nullable: false
    }
  },

  // Imagen del perfil
  {
    field: 'image',
    type: 'string',
    meta: {
      width: 'full',
      interface: 'input',
      note: 'URL de la imagen de perfil del testimoniante',
      options: {
        placeholder: '/male-profile.webp o /female-profile.webp'
      }
    },
    schema: {
      default_value: '/female-profile.webp',
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
  }
]
