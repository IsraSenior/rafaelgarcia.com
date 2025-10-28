/**
 * Schema para la colección de registros a eventos
 * Gestiona las inscripciones de personas a los eventos
 */

export default {
  collection: 'event_registrations',
  meta: {
    archive_field: 'status',
    archive_value: 'cancelled',
    unarchive_value: 'confirmed',
    singleton: false,
    sort_field: 'date_created',
    note: 'Registros de asistentes a eventos',
  },
  schema: {
    name: 'event_registrations',
  },
  fields: [
    // ID (auto-generado)
    {
      collection: 'event_registrations',
      field: 'id',
      type: 'integer',
      meta: {
        hidden: true,
        interface: 'input',
        readonly: true,
      },
      schema: {
        is_primary_key: true,
        has_auto_increment: true,
      },
    },

    // Estado
    {
      collection: 'event_registrations',
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Pendiente', value: 'pending' },
            { text: 'Confirmado', value: 'confirmed' },
            { text: 'Cancelado', value: 'cancelled' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Pendiente', value: 'pending', foreground: '#FFFFFF', background: '#FFA439' },
            { text: 'Confirmado', value: 'confirmed', foreground: '#FFFFFF', background: '#2ECDA7' },
            { text: 'Cancelado', value: 'cancelled', foreground: '#FFFFFF', background: '#B0BEC5' }
          ]
        },
        width: 'half',
        note: 'Estado del registro'
      },
      schema: {
        default_value: 'pending',
        is_nullable: false
      }
    },

    // Relación con evento
    {
      collection: 'event_registrations',
      field: 'event',
      type: 'integer',
      meta: {
        interface: 'select-dropdown-m2o',
        width: 'full',
        required: true,
        display: 'related-values',
        display_options: {
          template: '{{title}}'
        },
        options: {
          template: '{{title}}'
        }
      },
      schema: {
        is_nullable: false,
        foreign_key_table: 'events',
        foreign_key_column: 'id'
      }
    },

    // Nombre
    {
      collection: 'event_registrations',
      field: 'name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Nombre completo'
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Email
    {
      collection: 'event_registrations',
      field: 'email',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'correo@ejemplo.com',
          iconRight: 'email'
        },
        validation: {
          _and: [
            {
              email: {
                _submitted: true
              }
            }
          ]
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Teléfono
    {
      collection: 'event_registrations',
      field: 'phone',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: '+1 809 222 5466',
          iconRight: 'phone'
        },
        note: 'Teléfono de contacto (opcional)'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de registro
    {
      collection: 'event_registrations',
      field: 'registration_date',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        width: 'half',
        special: ['date-created'],
        note: 'Fecha en que se registró'
      },
      schema: {
        is_nullable: true
      }
    },

    // Notas del admin
    {
      collection: 'event_registrations',
      field: 'notes',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        width: 'full',
        options: {
          placeholder: 'Notas internas sobre este registro...'
        },
        note: 'Notas administrativas (no visibles para el usuario)'
      },
      schema: {
        is_nullable: true
      }
    },

    // Origen del registro
    {
      collection: 'event_registrations',
      field: 'source',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Sitio web', value: 'website' },
            { text: 'WhatsApp', value: 'whatsapp' },
            { text: 'Manual', value: 'manual' },
            { text: 'Otro', value: 'other' }
          ]
        },
        width: 'half',
        readonly: true,
        note: 'Origen del registro'
      },
      schema: {
        default_value: 'manual',
        is_nullable: false
      }
    },

    // Fecha de creación
    {
      collection: 'event_registrations',
      field: 'date_created',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        hidden: true,
        special: ['date-created'],
        width: 'half'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de actualización
    {
      collection: 'event_registrations',
      field: 'date_updated',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        hidden: true,
        special: ['date-updated'],
        width: 'half'
      },
      schema: {
        is_nullable: true
      }
    },
  ],
};
