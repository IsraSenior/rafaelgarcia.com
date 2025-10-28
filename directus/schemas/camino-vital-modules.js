/**
 * Schema para la colección de módulos de Camino Vital
 * Los tres módulos: Estabilizar, Sanar y Crecer
 */

export const caminoVitalModulesCollectionSchema = {
  collection: 'camino_vital_modules',
  meta: {
    collection: 'camino_vital_modules',
    icon: 'layers',
    note: 'Módulos del programa Camino Vital (Estabilizar, Sanar, Crecer)',
    display_template: '{{name}} - {{sort}}',
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
    name: 'camino_vital_modules'
  }
};

export const caminoVitalModulesFields = [
  {
    collection: 'camino_vital_modules',
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
    collection: 'camino_vital_modules',
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
    collection: 'camino_vital_modules',
    field: 'sort',
    type: 'integer',
    meta: {
      interface: 'input',
      hidden: true
    },
    schema: {}
  },
  {
    collection: 'camino_vital_modules',
    field: 'name',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        placeholder: 'Nombre del módulo (Ej: Estabilizar, Sanar, Crecer)'
      },
      width: 'half'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'camino_vital_modules',
    field: 'slug',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        slug: true,
        placeholder: 'URL amigable (ej: estabilizar)'
      },
      note: 'Se genera automáticamente desde el nombre',
      width: 'half'
    },
    schema: {
      is_nullable: false,
      is_unique: true
    }
  },
  {
    collection: 'camino_vital_modules',
    field: 'color_class',
    type: 'string',
    meta: {
      required: true,
      interface: 'select-dropdown',
      options: {
        choices: [
          { text: 'Estabilizar (Verde)', value: 'estabilizar' },
          { text: 'Sanar (Azul)', value: 'sanar' },
          { text: 'Crecer (Naranja)', value: 'crecer' }
        ]
      },
      width: 'half',
      note: 'Define el color del módulo en el sitio'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'camino_vital_modules',
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
          'h3',
          'h4',
          'numlist',
          'bullist',
          'link',
          'blockquote'
        ]
      },
      note: 'Descripción detallada del módulo',
      width: 'full'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'camino_vital_modules',
    field: 'video',
    type: 'uuid',
    meta: {
      interface: 'file',
      display: 'file',
      note: 'Video del módulo (opcional)',
      width: 'full'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'camino_vital_modules',
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
              width: 'full',
              required: true,
              options: {
                placeholder: 'Ej: Mejorar el sueño, la vitalidad y el manejo del estrés'
              }
            },
            schema: {
              is_nullable: false
            }
          }
        ]
      },
      note: 'Lista de beneficios principales de este módulo',
      width: 'full'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'camino_vital_modules',
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
    collection: 'camino_vital_modules',
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
