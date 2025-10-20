export type EventPriceType = 'free' | 'paid'
export type EventFormatType = 'online' | 'in-person'

export interface EventItem {
  id: string
  title: string
  shortDescription: string
  description: string
  image: string
  startDate: string
  endDate: string
  location: string
  format: EventFormatType
  priceType: EventPriceType
  priceLabel?: string
  registrationUrl?: string
  host?: {
    name: string
    role: string
    avatar: string
  }
  tags?: string[]
}

export const eventsCatalog: EventItem[] = [
  {
    id: 'respiracion-intencional-2025',
    title: 'Respiración Intencional para la Transformación Personal',
    shortDescription:
      'Un encuentro vivencial para explorar herramientas de respiración consciente que expanden tu bienestar emocional.',
    description:
      'En este taller presencial vivirás un viaje de respiración profunda guiada, acompañado de música y dinámicas corporales que facilitan la liberación emocional. Incluye material de apoyo, integración grupal y seguimiento.',
    image: '/proceso-de-curacion-de-la-mujer-de-vista-frontal.jpg',
    startDate: '2025-12-18T18:30:00-05:00',
    endDate: '2025-12-18T21:30:00-05:00',
    location: 'Casa Santullo, Bogotá (Zona G)',
    format: 'in-person',
    priceType: 'paid',
    priceLabel: '$160.000 COP por persona',
    registrationUrl: 'https://wa.link/agenda-respiracion',
    host: {
      name: 'Rafael García',
      role: 'Facilitador de respiración holotrópica',
    avatar: '/male-profile.webp',
    },
    tags: ['Respiración', 'Círculos presenciales', 'Gestión emocional'],
  },
  {
    id: 'masterclass-emociones-julio',
    title: 'Masterclass online: Creatividad para gestionar emociones',
    shortDescription:
      'Sesión virtual gratuita para entender el mapa emocional y activar recursos creativos que sostienen el cambio.',
    description:
      'Explora los principios de la gestión emocional creativa a través de ejercicios breves, visualizaciones guiadas y espacio de preguntas en vivo. Recibirás un kit descargable con prácticas para la semana posterior.',
    image: '/home-6.png',
    startDate: '2024-07-24T19:00:00-05:00',
    endDate: '2024-07-24T20:30:00-05:00',
    location: 'Zoom · Enlace privado al registrarte',
    format: 'online',
    priceType: 'free',
    registrationUrl: 'https://mailchi.mp/rafaelgarcia/masterclass-emociones',
    host: {
      name: 'Sara Méndez',
      role: 'Coach emocional y docente del programa Camino Vital',
    avatar: '/female-profile.webp',
    },
    tags: ['Virtual', 'Gratuito', 'Gestión emocional'],
  },
  {
    id: 'retiro-camino-vital-octubre',
    title: 'Retiro Camino Vital · Experiencia inmersiva de 3 días',
    shortDescription:
      'Retiro residencial con respiración holotrópica, trabajo corporal integrativo y acompañamiento terapéutico.',
    description:
      'Un viaje profundo en la naturaleza para conectar con tus recursos internos. Incluye alojamiento, alimentación consciente, sesiones de respiración, movimiento expresivo, círculos de palabra y acompañamiento terapéutico personalizado.',
    image: '/home-4.png',
    startDate: '2024-10-04T15:00:00-05:00',
    endDate: '2024-10-06T12:00:00-05:00',
    location: 'Casa Mística, Cajicá · Sabana de Bogotá',
    format: 'in-person',
    priceType: 'paid',
    priceLabel: 'Desde $1.350.000 COP · cupo limitado',
    registrationUrl: 'https://wa.link/retiro-camino-vital',
    host: {
      name: 'Equipo Camino Vital',
      role: 'Facilitadores certificados',
    avatar: '/male-profile.webp',
    },
    tags: ['Retiro', 'Vivir el proceso', 'Holotropía'],
  },
  {
    id: 'encuentro-alumni-junio',
    title: 'Encuentro Alumni Camino Vital · Integración y networking',
    shortDescription:
      'Espacio de co-creación para egresados, con prácticas de integración y panel de experiencias.',
    description:
      'Compartiremos novedades de la comunidad, presentaciones de proyectos y una práctica colectiva para sostener los procesos. Ideal para reconectar con tus pares y abrir nuevas colaboraciones.',
    image: '/home-9.png',
    startDate: '2024-06-15T10:00:00-05:00',
    endDate: '2024-06-15T13:00:00-05:00',
    location: 'Zoom · enlace exclusivo para alumni',
    format: 'online',
    priceType: 'free',
    registrationUrl: 'https://comunidad.rafaelgarcia.com/alumni',
    host: {
      name: 'Comunidad Camino Vital',
      role: 'Equipo de acompañamiento',
    avatar: '/female-profile.webp',
    },
    tags: ['Comunidad', 'Seguimiento', 'Virtual'],
  },
]
