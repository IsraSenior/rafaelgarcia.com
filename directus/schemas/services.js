/**
 * Schema para la colección de servicios en Directus
 * Incluye servicios normales, talleres y Camino Vital
 */

export const servicesCollectionSchema = {
  collection: 'services',
  meta: {
    collection: 'services',
    icon: 'category',
    note: 'Servicios, talleres y programas ofrecidos',
    display_template: '{{title}} ({{type}})',
    hidden: false,
    singleton: false,
    translations: null,
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'draft',
    archive_app_filter: true,
    sort_field: 'sort'
  },
  schema: {
    name: 'services'
  }
};

export const servicesFields = [
  {
    collection: 'services',
    field: 'id',
    type: 'integer',
    meta: {
      hidden: true,
      interface: 'input',
      readonly: true
    },
    schema: {
      is_primary_key: true,
      has_auto_increment: true
    }
  },
  {
    collection: 'services',
    field: 'status',
    type: 'string',
    meta: {
      width: 'full',
      interface: 'select-dropdown',
      options: {
        choices: [
          { text: 'Publicado', value: 'published' },
          { text: 'Borrador', value: 'draft' },
          { text: 'Archivado', value: 'archived' }
        ]
      },
      display: 'labels',
      display_options: {
        showAsDot: true,
        choices: [
          { text: 'Publicado', value: 'published', foreground: '#FFFFFF', background: '#00C897' },
          { text: 'Borrador', value: 'draft', foreground: '#18222F', background: '#D3DAE4' },
          { text: 'Archivado', value: 'archived', foreground: '#FFFFFF', background: '#F7971C' }
        ]
      }
    },
    schema: {
      default_value: 'draft',
      is_nullable: false
    }
  },
  {
    collection: 'services',
    field: 'sort',
    type: 'integer',
    meta: {
      interface: 'input',
      hidden: true
    },
    schema: {}
  },
  {
    collection: 'services',
    field: 'type',
    type: 'string',
    meta: {
      required: true,
      interface: 'select-dropdown',
      options: {
        choices: [
          { text: 'Servicio', value: 'service' },
          { text: 'Taller', value: 'workshop' },
          { text: 'Camino Vital', value: 'camino-vital' }
        ]
      },
      width: 'half',
      note: 'Define el tipo de servicio y qué campos mostrar'
    },
    schema: {
      is_nullable: false,
      default_value: 'service'
    }
  },
  {
    collection: 'services',
    field: 'title',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        placeholder: 'Título del servicio'
      },
      width: 'half'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'services',
    field: 'slug',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        slug: true,
        placeholder: 'URL amigable (ej: talleres-respiracion-holotropica)'
      },
      note: 'Se genera automáticamente desde el título, pero puedes editarlo'
    },
    schema: {
      is_nullable: false,
      is_unique: true
    }
  },
  {
    collection: 'services',
    field: 'description',
    type: 'text',
    meta: {
      required: true,
      interface: 'input-rich-text-html',
      options: {
        toolbar: [
          'bold',
          'italic',
          'underline',
          'h2',
          'h3',
          'h4',
          'numlist',
          'bullist',
          'link',
          'blockquote'
        ]
      },
      note: 'Descripción principal del servicio'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'services',
    field: 'featured_image',
    type: 'uuid',
    meta: {
      interface: 'file',
      display: 'image',
      options: {
        folder: null,
        template: '{{filename_download}}'
      },
      note: 'Imagen principal del servicio (recomendado: 800x1000px)',
      width: 'full'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'services',
    field: 'benefits',
    type: 'json',
    meta: {
      interface: 'list',
      options: {
        template: '{{benefit}}',
        addLabel: 'Agregar beneficio',
        fields: [
          {
            field: 'benefit',
            name: 'Beneficio',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'full'
            }
          }
        ]
      },
      note: 'Lista de beneficios principales del servicio'
    },
    schema: {
      is_nullable: true
    }
  },
  // Campos específicos para Camino Vital
  {
    collection: 'services',
    field: 'main_video',
    type: 'uuid',
    meta: {
      interface: 'file',
      display: 'file',
      note: 'Solo para Camino Vital - Video principal del programa',
      conditions: [
        {
          rule: {
            _and: [
              {
                type: {
                  _eq: 'camino-vital'
                }
              }
            ]
          },
          hidden: false
        }
      ],
      width: 'full'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'services',
    field: 'date_created',
    type: 'timestamp',
    meta: {
      special: ['date-created'],
      interface: 'datetime',
      readonly: true,
      hidden: true,
      width: 'half',
      display: 'datetime',
      display_options: {
        relative: true
      }
    },
    schema: {}
  },
  {
    collection: 'services',
    field: 'date_updated',
    type: 'timestamp',
    meta: {
      special: ['date-updated'],
      interface: 'datetime',
      readonly: true,
      hidden: true,
      width: 'half',
      display: 'datetime',
      display_options: {
        relative: true
      }
    },
    schema: {}
  }
];
