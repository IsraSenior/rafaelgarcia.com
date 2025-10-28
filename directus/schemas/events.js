/**
 * Schema para la colección de eventos
 * Gestiona eventos de Rafael García y terceros, presenciales/virtuales, gratis/pagos
 */

export default {
  collection: 'events',
  meta: {
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'published',
    singleton: false,
    sort_field: 'date_start',
    note: 'Eventos, talleres y conferencias',
  },
  schema: {
    name: 'events',
  },
  fields: [
    // ID (auto-generado)
    {
      collection: 'events',
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
      collection: 'events',
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Borrador', value: 'draft' },
            { text: 'Publicado', value: 'published' },
            { text: 'Archivado', value: 'archived' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Borrador', value: 'draft', foreground: '#FFFFFF', background: '#B0BEC5' },
            { text: 'Publicado', value: 'published', foreground: '#FFFFFF', background: '#2ECDA7' },
            { text: 'Archivado', value: 'archived', foreground: '#FFFFFF', background: '#607D8B' }
          ]
        },
        width: 'half',
        note: 'Estado del evento'
      },
      schema: {
        default_value: 'draft',
        is_nullable: false
      }
    },

    // Título
    {
      collection: 'events',
      field: 'title',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'full',
        required: true,
        options: {
          placeholder: 'Nombre del evento'
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Slug
    {
      collection: 'events',
      field: 'slug',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'evento-ejemplo',
          slug: true
        },
        note: 'URL amigable (se genera automáticamente del título)'
      },
      schema: {
        is_nullable: false,
        is_unique: true
      }
    },

    // Destacado
    {
      collection: 'events',
      field: 'featured',
      type: 'boolean',
      meta: {
        interface: 'boolean',
        width: 'half',
        note: 'Mostrar en la página principal'
      },
      schema: {
        default_value: false,
        is_nullable: false
      }
    },

    // Descripción
    {
      collection: 'events',
      field: 'description',
      type: 'text',
      meta: {
        interface: 'input-rich-text-html',
        width: 'full',
        required: true,
        options: {
          placeholder: 'Descripción completa del evento...'
        }
      },
      schema: {
        is_nullable: false
      }
    },

    // Tipo de evento
    {
      collection: 'events',
      field: 'event_type',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Rafael García', value: 'rafael_garcia' },
            { text: 'Tercero', value: 'third_party' }
          ]
        },
        width: 'half',
        required: true,
        note: 'Quién organiza el evento'
      },
      schema: {
        default_value: 'rafael_garcia',
        is_nullable: false
      }
    },

    // Formato
    {
      collection: 'events',
      field: 'format',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Presencial', value: 'in_person' },
            { text: 'Virtual', value: 'virtual' },
            { text: 'Híbrido', value: 'hybrid' }
          ]
        },
        width: 'half',
        required: true,
        note: 'Modalidad del evento'
      },
      schema: {
        default_value: 'in_person',
        is_nullable: false
      }
    },

    // Tipo de precio
    {
      collection: 'events',
      field: 'pricing_type',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Gratis', value: 'free' },
            { text: 'De pago', value: 'paid' }
          ]
        },
        width: 'half',
        required: true
      },
      schema: {
        default_value: 'free',
        is_nullable: false
      }
    },

    // Precio
    {
      collection: 'events',
      field: 'price',
      type: 'decimal',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: '0.00'
        },
        note: 'Precio del evento (dejar en 0 si es gratis)'
      },
      schema: {
        default_value: 0,
        is_nullable: true,
        numeric_precision: 10,
        numeric_scale: 2
      }
    },

    // Ubicación
    {
      collection: 'events',
      field: 'location',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'full',
        options: {
          placeholder: 'Dirección completa del evento'
        },
        note: 'Solo para eventos presenciales o híbridos'
      },
      schema: {
        is_nullable: true
      }
    },

    // Link virtual
    {
      collection: 'events',
      field: 'virtual_link',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'full',
        options: {
          placeholder: 'https://zoom.us/...'
        },
        note: 'Solo para eventos virtuales o híbridos'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de inicio
    {
      collection: 'events',
      field: 'date_start',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        width: 'half',
        required: true,
        note: 'Fecha y hora de inicio del evento'
      },
      schema: {
        is_nullable: false
      }
    },

    // Fecha de fin
    {
      collection: 'events',
      field: 'date_end',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        width: 'half',
        required: true,
        note: 'Fecha y hora de finalización del evento'
      },
      schema: {
        is_nullable: false
      }
    },

    // Capacidad
    {
      collection: 'events',
      field: 'capacity',
      type: 'integer',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: '50'
        },
        note: 'Capacidad máxima de asistentes (0 = ilimitado)'
      },
      schema: {
        default_value: 0,
        is_nullable: true
      }
    },

    // Imagen
    {
      collection: 'events',
      field: 'image',
      type: 'uuid',
      meta: {
        interface: 'file-image',
        width: 'full',
        note: 'Imagen principal del evento'
      },
      schema: {
        is_nullable: true
      }
    },

    // Número de WhatsApp
    {
      collection: 'events',
      field: 'whatsapp_number',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: '+18092225466'
        },
        note: 'Número de WhatsApp para reservas'
      },
      schema: {
        default_value: '+18092225466',
        is_nullable: false
      }
    },

    // Plantilla de mensaje WhatsApp
    {
      collection: 'events',
      field: 'whatsapp_message_template',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        width: 'full',
        options: {
          placeholder: 'Hola! Me gustaría reservar un cupo para {event_title}...'
        },
        note: 'Mensaje predeterminado. Usa {event_title}, {name}, {email} como variables'
      },
      schema: {
        default_value: 'Hola! Me gustaría reservar un cupo para el evento: {event_title}. Mi nombre es {name} y mi email es {email}.',
        is_nullable: true
      }
    },

    // Nombre del organizador
    {
      collection: 'events',
      field: 'organizer_name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: 'Rafael García'
        }
      },
      schema: {
        is_nullable: true
      }
    },

    // Email del organizador
    {
      collection: 'events',
      field: 'organizer_email',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: 'contacto@rafaelgarcia.com.co'
        }
      },
      schema: {
        is_nullable: true
      }
    },

    // Etiquetas
    {
      collection: 'events',
      field: 'tags',
      type: 'json',
      meta: {
        interface: 'tags',
        width: 'full',
        options: {
          placeholder: 'taller, conferencia, etc.'
        },
        note: 'Etiquetas para categorizar el evento'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de creación
    {
      collection: 'events',
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
      collection: 'events',
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
