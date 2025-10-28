/**
 * Schema para la colección de suscripciones al boletín informativo
 * Esta colección almacena los emails suscritos con validación de duplicados
 */

export default {
  collection: 'subscriptions',
  meta: {
    archive_field: 'status',
    archive_value: 'unsubscribed',
    unarchive_value: 'active',
    singleton: false,
    note: 'Suscriptores del boletín informativo',
  },
  schema: {
    name: 'subscriptions',
  },
  fields: [
    // ID (auto-generado por Directus)
    {
      collection: 'subscriptions',
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

    // Estado de la suscripción
    {
      collection: 'subscriptions',
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Activo', value: 'active' },
            { text: 'Pendiente confirmación', value: 'pending' },
            { text: 'Desuscrito', value: 'unsubscribed' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Activo', value: 'active', foreground: '#FFFFFF', background: '#2ECDA7' },
            { text: 'Pendiente', value: 'pending', foreground: '#FFFFFF', background: '#FFA439' },
            { text: 'Desuscrito', value: 'unsubscribed', foreground: '#FFFFFF', background: '#B0BEC5' }
          ]
        },
        width: 'half',
        note: 'Estado de la suscripción'
      },
      schema: {
        default_value: 'active',
        is_nullable: false
      }
    },

    // Email (único - validación clave)
    {
      collection: 'subscriptions',
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
        },
        note: 'Correo electrónico del suscriptor (único)'
      },
      schema: {
        is_nullable: false,
        is_unique: true // IMPORTANTE: Email único para evitar duplicados
      }
    },

    // Nombre (opcional)
    {
      collection: 'subscriptions',
      field: 'name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: false,
        options: {
          placeholder: 'Nombre (opcional)'
        }
      },
      schema: {
        is_nullable: true
      }
    },

    // Origen de la suscripción
    {
      collection: 'subscriptions',
      field: 'source',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Formulario de contacto', value: 'contact_form' },
            { text: 'EndSection subscribe', value: 'end_section' },
            { text: 'Footer', value: 'footer' },
            { text: 'Manual', value: 'manual' }
          ]
        },
        width: 'half',
        readonly: true,
        note: 'Desde dónde se suscribió'
      },
      schema: {
        default_value: 'manual',
        is_nullable: false
      }
    },

    // IP del cliente
    {
      collection: 'subscriptions',
      field: 'client_ip',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'IP desde donde se suscribió'
      },
      schema: {
        is_nullable: true
      }
    },

    // Token de desuscripción (para links únicos)
    {
      collection: 'subscriptions',
      field: 'unsubscribe_token',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        hidden: true,
        note: 'Token único para desuscribirse'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de suscripción
    {
      collection: 'subscriptions',
      field: 'date_subscribed',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        special: ['date-created'],
        width: 'half',
        note: 'Fecha en que se suscribió'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de desuscripción
    {
      collection: 'subscriptions',
      field: 'date_unsubscribed',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        width: 'half',
        note: 'Fecha en que se desuscribió'
      },
      schema: {
        is_nullable: true
      }
    },

    // Notas
    {
      collection: 'subscriptions',
      field: 'notes',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        width: 'full',
        options: {
          placeholder: 'Notas sobre este suscriptor...'
        }
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de creación
    {
      collection: 'subscriptions',
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
      collection: 'subscriptions',
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
