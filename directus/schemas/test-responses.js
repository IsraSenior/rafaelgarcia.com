/**
 * Schema para la colección de respuestas del test de onboarding
 * Esta colección almacena todas las respuestas del test de diagnóstico
 * junto con los datos del usuario y la información técnica capturada
 */

export default {
  collection: 'test_responses',
  meta: {
    archive_field: 'status',
    archive_value: 'archived',
    unarchive_value: 'new',
    singleton: false,
    icon: 'quiz',
    note: 'Respuestas del test de diagnóstico de las 6 dimensiones',
  },
  schema: {
    name: 'test_responses',
  },
  fields: [
    // ID (auto-generado por Directus)
    {
      collection: 'test_responses',
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

    // Estado del test
    {
      collection: 'test_responses',
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Nuevo', value: 'new' },
            { text: 'Revisado', value: 'reviewed' },
            { text: 'Contactado', value: 'contacted' },
            { text: 'Archivado', value: 'archived' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Nuevo', value: 'new', foreground: '#FFFFFF', background: '#2ECDA7' },
            { text: 'Revisado', value: 'reviewed', foreground: '#FFFFFF', background: '#6644FF' },
            { text: 'Contactado', value: 'contacted', foreground: '#FFFFFF', background: '#FFA439' },
            { text: 'Archivado', value: 'archived', foreground: '#FFFFFF', background: '#B0BEC5' }
          ]
        },
        width: 'half',
        note: 'Estado actual del test completado'
      },
      schema: {
        default_value: 'new',
        is_nullable: false
      }
    },

    // ============================================================================
    // DATOS DEL USUARIO
    // ============================================================================

    // Nombre
    {
      collection: 'test_responses',
      field: 'first_name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Nombre'
        },
        note: 'Nombre del usuario'
      },
      schema: {
        is_nullable: false
      }
    },

    // Apellido
    {
      collection: 'test_responses',
      field: 'last_name',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        required: true,
        options: {
          placeholder: 'Apellido'
        },
        note: 'Apellido del usuario'
      },
      schema: {
        is_nullable: false
      }
    },

    // Email
    {
      collection: 'test_responses',
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
        note: 'Correo electrónico del usuario'
      },
      schema: {
        is_nullable: false
      }
    },

    // Teléfono
    {
      collection: 'test_responses',
      field: 'phone',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        options: {
          placeholder: '+57 300 123 4567',
          iconRight: 'phone'
        },
        note: 'Teléfono del usuario (opcional)'
      },
      schema: {
        is_nullable: true
      }
    },

    // ============================================================================
    // DATOS TÉCNICOS CAPTURADOS
    // ============================================================================

    // IP del cliente
    {
      collection: 'test_responses',
      field: 'ip',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Dirección IP del usuario'
      },
      schema: {
        is_nullable: true
      }
    },

    // País
    {
      collection: 'test_responses',
      field: 'country',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'País detectado desde la IP'
      },
      schema: {
        is_nullable: true
      }
    },

    // Ciudad
    {
      collection: 'test_responses',
      field: 'city',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Ciudad detectada desde la IP'
      },
      schema: {
        is_nullable: true
      }
    },

    // Navegador
    {
      collection: 'test_responses',
      field: 'browser',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Navegador utilizado'
      },
      schema: {
        is_nullable: true
      }
    },

    // Versión del navegador
    {
      collection: 'test_responses',
      field: 'browser_version',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Versión del navegador'
      },
      schema: {
        is_nullable: true
      }
    },

    // Sistema operativo
    {
      collection: 'test_responses',
      field: 'os',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Sistema operativo'
      },
      schema: {
        is_nullable: true
      }
    },

    // Versión del sistema operativo
    {
      collection: 'test_responses',
      field: 'os_version',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Versión del sistema operativo'
      },
      schema: {
        is_nullable: true
      }
    },

    // Tipo de dispositivo
    {
      collection: 'test_responses',
      field: 'device',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Desktop', value: 'Desktop' },
            { text: 'Mobile', value: 'Mobile' },
            { text: 'Tablet', value: 'Tablet' }
          ]
        },
        width: 'half',
        readonly: true,
        note: 'Tipo de dispositivo (Desktop, Mobile, Tablet)'
      },
      schema: {
        is_nullable: true
      }
    },

    // Resolución de pantalla
    {
      collection: 'test_responses',
      field: 'screen_resolution',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Resolución de pantalla (ej: 1920x1080)'
      },
      schema: {
        is_nullable: true
      }
    },

    // Idioma
    {
      collection: 'test_responses',
      field: 'language',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Idioma del navegador'
      },
      schema: {
        is_nullable: true
      }
    },

    // Zona horaria
    {
      collection: 'test_responses',
      field: 'timezone',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Zona horaria del usuario'
      },
      schema: {
        is_nullable: true
      }
    },

    // User Agent completo
    {
      collection: 'test_responses',
      field: 'user_agent',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        width: 'full',
        readonly: true,
        hidden: true,
        note: 'User Agent completo del navegador'
      },
      schema: {
        is_nullable: true
      }
    },

    // ============================================================================
    // DATOS DEL TEST
    // ============================================================================

    // Respuestas del test (JSON)
    {
      collection: 'test_responses',
      field: 'answers',
      type: 'json',
      meta: {
        interface: 'input-code',
        width: 'full',
        readonly: true,
        options: {
          language: 'json',
          lineNumber: true
        },
        note: 'Todas las respuestas del test en formato JSON'
      },
      schema: {
        is_nullable: true
      }
    },

    // Puntajes por dimensión (JSON)
    {
      collection: 'test_responses',
      field: 'scores',
      type: 'json',
      meta: {
        interface: 'input-code',
        width: 'full',
        readonly: true,
        options: {
          language: 'json',
          lineNumber: true
        },
        note: 'Puntajes calculados por cada dimensión'
      },
      schema: {
        is_nullable: true
      }
    },

    // Dimensión más fuerte
    {
      collection: 'test_responses',
      field: 'strongest_dimension',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Dimensión con mayor puntaje'
      },
      schema: {
        is_nullable: true
      }
    },

    // Puntaje de la dimensión más fuerte
    {
      collection: 'test_responses',
      field: 'strongest_score',
      type: 'integer',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Puntaje de la dimensión más fuerte'
      },
      schema: {
        is_nullable: true
      }
    },

    // Dimensión más débil
    {
      collection: 'test_responses',
      field: 'weakest_dimension',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Dimensión con menor puntaje'
      },
      schema: {
        is_nullable: true
      }
    },

    // Puntaje de la dimensión más débil
    {
      collection: 'test_responses',
      field: 'weakest_score',
      type: 'integer',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Puntaje de la dimensión más débil'
      },
      schema: {
        is_nullable: true
      }
    },

    // Puntaje promedio
    {
      collection: 'test_responses',
      field: 'average_score',
      type: 'integer',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Puntaje promedio de todas las dimensiones'
      },
      schema: {
        is_nullable: true
      }
    },

    // Tiempo de completación (en segundos)
    {
      collection: 'test_responses',
      field: 'completion_time',
      type: 'integer',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        note: 'Tiempo que tomó completar el test (en segundos)'
      },
      schema: {
        is_nullable: true
      }
    },

    // ============================================================================
    // NOTAS Y SEGUIMIENTO
    // ============================================================================

    // Notas internas
    {
      collection: 'test_responses',
      field: 'internal_notes',
      type: 'text',
      meta: {
        interface: 'input-rich-text-md',
        width: 'full',
        options: {
          placeholder: 'Notas internas sobre este test...'
        },
        note: 'Notas internas para seguimiento'
      },
      schema: {
        is_nullable: true
      }
    },

    // ============================================================================
    // TIMESTAMPS
    // ============================================================================

    // Fecha de creación (cuando se completó el test)
    {
      collection: 'test_responses',
      field: 'date_created',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        special: ['date-created'],
        width: 'half',
        note: 'Fecha y hora en que se completó el test'
      },
      schema: {
        is_nullable: true
      }
    },

    // Fecha de última actualización
    {
      collection: 'test_responses',
      field: 'date_updated',
      type: 'timestamp',
      meta: {
        interface: 'datetime',
        readonly: true,
        special: ['date-updated'],
        width: 'half',
        note: 'Fecha y hora de última actualización'
      },
      schema: {
        is_nullable: true
      }
    },

    // Timestamp del test (capturado del cliente)
    {
      collection: 'test_responses',
      field: 'test_timestamp',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'half',
        readonly: true,
        hidden: true,
        note: 'Timestamp ISO capturado en el cliente'
      },
      schema: {
        is_nullable: true
      }
    },
  ],
};
