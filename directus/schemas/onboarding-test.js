/**
 * Schema para la colección singleton del test de onboarding
 * Singleton que contiene todas las dimensiones, preguntas y feedback del test
 */

export const onboardingTestCollectionSchema = {
  collection: 'onboarding_test',
  meta: {
    collection: 'onboarding_test',
    icon: 'psychology',
    note: 'Configuración del test de diagnóstico de las 6 dimensiones del ser humano',
    display_template: null,
    hidden: false,
    singleton: true, // IMPORTANTE: Es un singleton
    translations: [{ language: 'es-ES', translation: 'Test de Onboarding' }],
    archive_field: null,
    archive_value: null,
    unarchive_value: null,
    sort_field: null
  },
  schema: {
    name: 'onboarding_test'
  }
};

export const onboardingTestFields = [
  {
    collection: 'onboarding_test',
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
    collection: 'onboarding_test',
    field: 'title',
    type: 'string',
    meta: {
      required: true,
      interface: 'input',
      options: {
        placeholder: 'Título del test'
      },
      width: 'full'
    },
    schema: {
      is_nullable: false,
      default_value: 'Test de Diagnóstico - 6 Dimensiones'
    }
  },
  {
    collection: 'onboarding_test',
    field: 'description',
    type: 'text',
    meta: {
      interface: 'input-multiline',
      options: {
        placeholder: 'Descripción del test'
      },
      width: 'full'
    },
    schema: {
      is_nullable: true
    }
  },
  {
    collection: 'onboarding_test',
    field: 'options',
    type: 'json',
    meta: {
      interface: 'list',
      options: {
        template: '{{value}} - {{label}}',
        addLabel: 'Agregar opción',
        fields: [
          {
            field: 'value',
            name: 'Valor',
            type: 'integer',
            meta: {
              interface: 'input',
              required: true,
              width: 'half',
              options: {
                placeholder: '0, 1, 2 o 3'
              }
            }
          },
          {
            field: 'label',
            name: 'Etiqueta',
            type: 'string',
            meta: {
              interface: 'input',
              required: true,
              width: 'half',
              options: {
                placeholder: 'Ej: Casi nunca'
              }
            }
          }
        ]
      },
      note: 'Opciones de respuesta del test (0: Casi nunca, 1: Algunas veces, 2: A menudo, 3: Siempre)',
      width: 'full'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'onboarding_test',
    field: 'dimensions',
    type: 'json',
    meta: {
      interface: 'list',
      options: {
        template: '{{key}} - {{label}}',
        addLabel: 'Agregar dimensión',
        fields: [
          {
            field: 'key',
            name: 'Key (identificador único)',
            type: 'string',
            meta: {
              interface: 'input',
              required: true,
              width: 'half',
              options: {
                placeholder: 'fisica, emocional, mental...'
              }
            }
          },
          {
            field: 'label',
            name: 'Nombre de la dimensión',
            type: 'string',
            meta: {
              interface: 'input',
              required: true,
              width: 'half',
              options: {
                placeholder: 'Física, Emocional, Mental...'
              }
            }
          },
          {
            field: 'variables',
            name: 'Preguntas/Variables',
            type: 'json',
            meta: {
              interface: 'list',
              options: {
                template: '{{id}} - {{label}}',
                addLabel: 'Agregar pregunta',
                fields: [
                  {
                    field: 'id',
                    name: 'ID único',
                    type: 'string',
                    meta: {
                      interface: 'input',
                      required: true,
                      width: 'half',
                      options: {
                        placeholder: 'q1, q2, q3...'
                      }
                    }
                  },
                  {
                    field: 'key',
                    name: 'Key (identificador)',
                    type: 'string',
                    meta: {
                      interface: 'input',
                      required: true,
                      width: 'half',
                      options: {
                        placeholder: 'sueno, ocio, respiracion...'
                      }
                    }
                  },
                  {
                    field: 'label',
                    name: 'Etiqueta (para resultados)',
                    type: 'string',
                    meta: {
                      interface: 'input',
                      required: true,
                      width: 'full',
                      options: {
                        placeholder: 'Sueño, Ocio y placer, Oxígeno y respiración...'
                      }
                    }
                  },
                  {
                    field: 'question',
                    name: 'Pregunta',
                    type: 'text',
                    meta: {
                      interface: 'input-multiline',
                      required: true,
                      width: 'full',
                      options: {
                        placeholder: '¿Me levanto la mayoría de los días sintiéndome descansado/a...?'
                      }
                    }
                  },
                  {
                    field: 'feedback',
                    name: 'Feedback por nivel',
                    type: 'json',
                    meta: {
                      interface: 'input-code',
                      required: true,
                      width: 'full',
                      options: {
                        language: 'json',
                        placeholder: '{"0": "Feedback para nivel 0", "1": "...", "2": "...", "3": "..."}'
                      },
                      note: 'Objeto JSON con feedback para cada nivel de respuesta (0, 1, 2, 3)'
                    }
                  }
                ]
              },
              width: 'full'
            }
          }
        ]
      },
      note: 'Las 6 dimensiones del test con sus respectivas preguntas y feedback',
      width: 'full'
    },
    schema: {
      is_nullable: false
    }
  },
  {
    collection: 'onboarding_test',
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
    collection: 'onboarding_test',
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
