/**
 * Schema para la colección de miembros del equipo en Directus
 */

export const teamCollectionSchema = {
  collection: 'team_members',
  meta: {
    collection: 'team_members',
    icon: 'people',
    note: 'Miembros del equipo que aparecen en la página de Equipo',
    display_template: '{{name}} - {{title}}',
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
    name: 'team_members'
  }
};

export const teamFields = [
  {
    collection: 'team_members',
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
    collection: 'team_members',
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
    collection: 'team_members',
    field: 'sort',
    type: 'integer',
    meta: {
      interface: 'input',
      hidden: true
    },
    schema: {}
  },
  {
    collection: 'team_members',
    field: 'name',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        placeholder: 'Nombre completo del miembro del equipo'
      },
      width: 'half'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'team_members',
    field: 'title',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        placeholder: 'Rol o especialidad (ej: Psicóloga, Cirujano general)'
      },
      width: 'half'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'team_members',
    field: 'slug',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        slug: true,
        placeholder: 'URL amigable (ej: ricardo-didomenico)'
      },
      note: 'Se genera automáticamente desde el nombre, pero puedes editarlo'
    },
    schema: {
      is_nullable: false,
      is_unique: true
    }
  },
  {
    collection: 'team_members',
    field: 'bio',
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
          'numlist',
          'bullist',
          'link'
        ]
      }
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'team_members',
    field: 'image',
    type: 'uuid',
    meta: {
      interface: 'file',
      display: 'image',
      options: {
        folder: null,
        template: '{{filename_download}}'
      },
      note: 'Imagen del miembro del equipo (recomendado: 800x800px)'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'team_members',
    field: 'links',
    type: 'json',
    meta: {
      interface: 'list',
      options: {
        template: '{{label}}: {{url}}',
        addLabel: 'Agregar enlace',
        fields: [
          {
            field: 'label',
            name: 'Etiqueta',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half'
            }
          },
          {
            field: 'url',
            name: 'URL',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half'
            }
          },
          {
            field: 'type',
            name: 'Tipo',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              width: 'half',
              options: {
                choices: [
                  { text: 'LinkedIn', value: 'linkedin' },
                  { text: 'Instagram', value: 'instagram' },
                  { text: 'Facebook', value: 'facebook' },
                  { text: 'Twitter/X', value: 'twitter' },
                  { text: 'Sitio web', value: 'website' },
                  { text: 'Email', value: 'email' },
                  { text: 'Otro', value: 'other' }
                ]
              }
            }
          }
        ]
      },
      note: 'Enlaces a redes sociales o sitio web personal'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'team_members',
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
    collection: 'team_members',
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
