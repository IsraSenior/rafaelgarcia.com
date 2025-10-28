/**
 * Schema para la colección de leads del formulario de contacto
 * Esta colección almacena todos los mensajes recibidos a través del formulario
 */

export default {
  collection: 'leads',
  meta: {
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'draft',
    singleton: false,
    note: 'Leads generados desde el formulario de contacto',
  },
  schema: {
    name: 'leads',
  },
  fields: [
    // ID (auto-generado por Directus)
    {
      collection: 'leads',
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

    // Estado del lead
    {
      collection: 'leads',
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Nuevo', value: 'new' },
            { text: 'En proceso', value: 'in_progress' },
            { text: 'Contactado', value: 'contacted' },
            { text: 'Cerrado', value: 'closed' },
            { text: 'Archivado', value: 'archived' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Nuevo', value: 'new', foreground: '#FFFFFF', background: '#2ECDA7' },
            { text: 'En proceso', value: 'in_progress', foreground: '#FFFFFF', background: '#FFA439' },
            { text: 'Contactado', value: 'contacted', foreground: '#FFFFFF', background: '#6644FF' },
            { text: 'Cerrado', value: 'closed', foreground: '#FFFFFF', background: '#A2B5CD' },
            { text: 'Archivado', value: 'archived', foreground: '#FFFFFF', background: '#B0BEC5' }
          ]
        },
        width: 'half',
        note: 'Estado actual del lead'
      },
      schema: {
        default_value: 'new',
        is_nullable: false
      }
    },

    // Nombre
    {
      collection: 'leads',
      field: 'name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Nombre del contacto'
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Apellidos
    {
      collection: 'leads',
      field: 'lastname',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Apellidos del contacto'
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Email
    {
      collection: 'leads',
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
        note: 'Correo electrónico del contacto'
      },
      schema: {
        is_nullable: false,
        is_unique: false // Permitimos duplicados en leads, pero validaremos en subscriptions
      }
    },

    // Servicio de interés
    {
      collection: 'leads',
      field: 'service',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Servicio o taller de interés'
        },
        note: 'Servicio o taller seleccionado'
      },
      schema: {
        is_nullable: false
      }
    },

    // Preferencia de contacto
    {
      collection: 'leads',
      field: 'contact_preference',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Correo electrónico', value: 'email' },
            { text: 'WhatsApp', value: 'whatsapp' }
          ]
        },
        width: 'half',
        note: 'Preferencia de contacto del lead'
      },
      schema: {
        default_value: 'email',
        is_nullable: false
      }
    },

    // Mensaje
    {
      collection: 'leads',
      field: 'message',
      type: 'text',
      meta: {
        interface: 'input-rich-text-md',
        width: 'full',
        options: {
          placeholder: 'Mensaje del contacto...'
        }
      },
      schema: {
        is_nullable: true
      }
    },

    // Suscrito al newsletter
    {
      collection: 'leads',
      field: 'newsletter_subscribed',
      type: 'boolean',
      meta: {
        interface: 'boolean',
        width: 'half',
        note: 'Indica si el contacto se suscribió al boletín'
      },
      schema: {
        default_value: false,
        is_nullable: false
      }
    },

    // IP del cliente (para seguridad)
    {
      collection: 'leads',
      field: 'client_ip',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        hidden: false,
        note: 'IP desde donde se envió el formulario'
      },
      schema: {
        is_nullable: true
      }
    },

    // User Agent (para análisis)
    {
      collection: 'leads',
      field: 'user_agent',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        width: 'full',
        readonly: true,
        hidden: true,
        note: 'Navegador y dispositivo usado'
      },
      schema: {
        is_nullable: true
      }
    },

    // Notas internas
    {
      collection: 'leads',
      field: 'internal_notes',
      type: 'text',
      meta: {
        interface: 'input-rich-text-md',
        width: 'full',
        options: {
          placeholder: 'Notas internas sobre este lead...'
        },
        note: 'Notas internas para seguimiento'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de creación
    {
      collection: 'leads',
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
      collection: 'leads',
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
