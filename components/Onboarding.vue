<script setup lang="ts">
const store = useMainStore();
import { ref, computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

/** Tipos */
interface Option { value: 0 | 1 | 2 | 3; label: string }
interface Variable {
  id: string // id único de pregunta
  key: string
  label: string // NO se muestra en el wizard, sólo en resultados
  question: string
  feedback: Record<Option['value'], string>
}
interface Dimension {
  key: string
  label: string
  variables: Variable[]
}

let currentDim = ref(0);
let currentSub = ref(0);

// 1) DATA --------------------------------------------------------------------
const dimensions: Dimension[] = [
  {
    key: "fisica",
    label: "Física",
    variables: [
      {
        id: "q1",
        key: "sueno",
        label: "Sueño",
        question: "¿Me levanto la mayoría de los días sintiéndome descansado / a y con la energía suficiente para afrontar la jornada?",
        feedback: {
          0: "Un sueño insuficiente afecta tu energía, concentración y equilibrio emocional. Dormir bien aumenta tu vitalidad y mejora tu ánimo. Si no lo logras, puedes sentir agotamiento, irritabilidad y menor rendimiento. En el módulo Estabilizar de Camino Vital aprenderás a crear hábitos y rutinas para dormir profundamente y recuperar tu energía.",
          1: "A veces descansas bien, pero la irregularidad en tu sueño puede disminuir tu resistencia al estrés. Dormir bien de forma constante fortalece tu sistema inmune y mejora tu enfoque. El módulo Estabilizar de Camino Vital te ofrece estrategias prácticas para estabilizar tu descanso y mantener altos niveles de energía.",
          2: "Duermes bien la mayoría de las veces, lo que favorece tu salud física y mental. Afinar hábitos puede ayudarte a prevenir recaídas en el cansancio. En Camino Vital, dentro del módulo Estabilizar, reforzarás técnicas para optimizar tu descanso.",
          3: "¡Excelente! Mantener un sueño de calidad te da energía constante, claridad mental y estabilidad emocional. Este hábito te protege del desgaste. Puedes potenciar tu bienestar explorando otros aspectos de la salud física en el módulo Estabilizar."
        }
      },
      {
        id: "q2",
        key: "ocio",
        label: "Ocio y placer",
        question: "¿Dedico tiempo semanal a actividades que me generan alegría, satisfacción y disfrute personal, distintas a las laborales?",
        feedback: {
          0: "Privarte de momentos de ocio reduce tu bienestar emocional y tu capacidad de recargar energía. Disfrutar de actividades placenteras aumenta la motivación y la creatividad. Sin ellas, el riesgo es caer en agotamiento, desconexión emocional y una dificultad para disfrutar la vida. En Camino Vital, módulo Estabilizar, aprenderás a integrar el ocio consciente para equilibrar tu energía.",
          1: "A veces disfrutas de actividades de ocio, pero no lo suficiente para mantener tu energía y alegría estables. Incluirlas con regularidad fortalece tu salud mental, tus relaciones y tu capacidad para disfrutar la vida. El módulo Estabilizar de Camino Vital te ayudará a planificar espacios de disfrute que alimenten tu vitalidad.",
          2: "Dedicas tiempo a actividades que te gustan, lo que beneficia tu ánimo y energía. Pequeños ajustes en frecuencia o calidad de estas experiencias pueden potenciar tu bienestar y tu capacidad para disfrutar la vida. En Camino Vital, módulo Estabilizar, encontrarás ideas y prácticas para enriquecer estos momentos.",
          3: "¡Muy bien! Integrar el ocio y el placer en tu vida fortalece tu resiliencia, tu energía y tu capacidad para disfrutar la vida. Si quieres ampliar tu repertorio de actividades significativas, el módulo Estabilizar te dará nuevas herramientas."
        }
      },
      {
        id: "q3",
        key: "respiracion",
        label: "Oxígeno y respiración",
        question: "¿Dedico tiempo a respirar conscientemente para oxigenar mi cuerpo y calmar mi mente?",
        feedback: {
          0: "No prestar atención a tu respiración limita tu capacidad de gestionar el estrés y mantener energía constante. Respirar bien favorece la claridad mental, regula emociones y fortalece el sistema nervioso.Sin esta práctica, es más fácil vivir en tensión y agotamiento. En Camino Vital, el módulo Estabilizar, a través de talleres como el de manejo del estrés, te enseña técnicas simples para recuperar equilibrio y energía.",
          1: "En ocasiones practicas la respiración consciente, pero hacerlo con más regularidad puede multiplicar tu bienestar físico y emocional. En Camino Vital, el módulo Estabilizar, a través de talleres como el de manejo del estrés, te enseña técnicas simples para recuperar equilibrio y energía.",
          2: "Respiras conscientemente la mayor parte del tiempo, lo que favorece tu calma y energía. Pequeños ajustes en técnica y frecuencia pueden potenciar aún más estos beneficios. El módulo Estabilizar incluye prácticas en su taller: Respiración, sistema nervioso y estrés.",
          3: "¡Excelente! Mantener una respiración consciente y profunda sostiene tu vitalidad y equilibrio emocional. Puedes explorar prácticas más profundas en el módulo Crecer, a través del taller de meditación."
        }
      },
      {
        id: "q4",
        key: "energia",
        label: "Nivel de energía",
        question: "¿Mantengo un buen nivel de energía física y mental durante la mayor parte del día?",
        feedback: {
          0: "Vivir con poca energía dificulta tu rendimiento y bienestar.Un nivel óptimo de energía mejora la motivación, la concentración y el ánimo. No cuidarlo puede llevar a agotamiento crónico. En Camino Vital, módulo Estabilizar, el taller Gestión Consciente de la Energía te enseña a ganar, invertir y recuperar tu energía de forma sostenible.",
          1: "Tienes días con buena energía, pero la inestabilidad te impide rendir al máximo. Mejorar hábitos y aprender a administrar tu energía marcará la diferencia. El taller Gestión Consciente de la Energía en el módulo Estabilizar te ofrece estrategias claras para lograrlo.",
          2: "Mantener energía la mayor parte del día te permite vivir con más plenitud. Afinar cómo la inviertes y recuperas puede prevenir caídas de rendimiento. En Camino Vital, módulo Estabilizar, el taller Gestión Consciente de la Energía te ayudará a optimizar tu vitalidad.",
          3: "¡Muy bien! Sostener altos niveles de energía diaria es clave para tu bienestar. Puedes perfeccionar tu capacidad de ganar, invertir y recuperar energía con el taller Gestión Consciente de la Energía del módulo Estabilizar."
        }
      },
      {
        id: "q5",
        key: "movimiento",
        label: "Movimiento",
        question: "¿Realizo actividad física regularmente para mantener mi fuerza, resistencia y bienestar general?",
        feedback: {
          0: "La falta de movimiento limita tu energía, salud cardiovascular y capacidad de manejar el estrés. El ejercicio regular mejora tu ánimo, tu salud física y tu claridad mental. No moverte lo suficiente puede derivar en problemas físicos y emocionales. En Camino Vital, mediante el taller de diagnóstico de las seis dimensiones, en el módulo Estabilizar, podrás identificar tus áreas de oportunidad y aprender formas sencillas de integrar el movimiento a tu vida diaria.",
          1: "Haces algo de actividad física, pero no lo suficiente para mantenerte en óptimas condiciones. Moverte más te ayudará a ganar energía y prevenir dolencias. En Camino Vital, a través del taller de diagnóstico de las seis dimensiones del módulo Estabilizar, podrás ver dónde están tus oportunidades de mejora y recibir ideas para incorporarlas en tu rutina.",
          2: "Te ejercitas con frecuencia y eso es un gran aporte a tu salud integral. Ajustar variedad o intensidad puede llevarte al siguiente nivel. En Camino Vital, el taller de diagnóstico de las seis dimensiones del módulo Estabilizar, te ayudará a identificar mejoras posibles y te dará motivación para lograrlas.",
          3: "¡Excelente! Mantener un hábito regular de movimiento fortalece tu cuerpo y mente. En Camino Vital, el taller de diagnóstico de las seis dimensiones del módulo Estabilizar, puede mostrarte nuevas ideas y motivación para seguir creciendo en esta área."
        }
      }
    ]
  },
  {
    key: "emocional",
    label: "Emocional",
    variables: [
      {
        id: "q6",
        key: "manejo_emociones",
        label: "Manejo creativo de las emociones",
        question: "¿Soy capaz de identificar, comprender y canalizar mis emociones de forma constructiva sin hacerme daño o hacérselo a los demás?",
        feedback: {
          0: "Si no gestionas bien tus emociones, pueden controlarte y afectar tus relaciones, decisiones y salud. Aprender a manejarlas creativamente te da libertad y equilibrio emocional. En Camino Vital, el taller Manejo Creativo de las Emociones del módulo Estabilizar, te enseña técnicas prácticas para transformar la frustración, el miedo, la rabia, entre otras, en acciones constructivas.",
          1: "En ocasiones logras canalizar tus emociones de manera constructiva, pero aún pierdes control en momentos clave. Fortalecer esta habilidad te ayudará a vivir con más serenidad y confianza. En Camino Vital, el taller Manejo Creativo de las Emociones del módulo Estabilizar, te enseña técnicas prácticas para transformar la frustración, el miedo, la rabia, entre otras, en acciones constructivas.",
          2: "Sueles manejar bien tus emociones, lo que favorece tu bienestar y tus relaciones. Aun así, pulir esta habilidad te dará mayor seguridad y claridad. En Camino Vital, el taller Manejo Creativo de las Emociones del módulo Estabilizar, te enseña técnicas prácticas para transformar la frustración, el miedo, la rabia, entre otras, en acciones constructivas.",
          3: "¡Muy bien! Gestionar tus emociones de forma creativa es clave para tu equilibrio. Puedes profundizar en tu desarrollo con el taller Manejo Creativo de las Emociones del módulo Estabilizar."
        }
      },
      {
        id: "q7",
        key: "bienestar",
        label: "Generación de estados de bienestar",
        question: "¿Soy capaz de generar conscientemente emociones y sensaciones positivas que me ayuden a mantener un estado de ánimo equilibrado?",
        feedback: {
          0: "Si dependes solo de las circunstancias externas para sentirte bien, tu bienestar será frágil. Aprender a generarlo desde dentro fortalece tu resiliencia y energía. En Camino Vital, el taller Generación de Estados de Bienestar del módulo Estabilizar, te enseña prácticas simples para crear calma, alegría y gratitud de manera consciente.",
          1: "A veces logras crear estados positivos, pero no siempre de forma intencional. Convertirlo en hábito te dará mayor control sobre tu ánimo y tu energía. En Camino Vital, el taller Generación de Estados de Bienestar del módulo Estabilizar, te enseña prácticas simples para crear calma, alegría y gratitud de manera consciente.",
          2: "Generas estados de bienestar con frecuencia, lo que te permite afrontar mejor los retos. Pequeños ajustes pueden ayudarte a mantenerlos por más tiempo. En Camino Vital, el taller Generación de Estados de Bienestar del módulo Estabilizar, te enseña prácticas simples para crear calma, alegría y gratitud de manera consciente.",
          3: "¡Excelente! Tener la capacidad de crear bienestar interno es un recurso valioso. Puedes seguir enriqueciéndolo con las estrategias del taller Generación de Estados de Bienestar del módulo Estabilizar."
        }
      },
      {
        id: "q8",
        key: "heridas",
        label: "Heridas emocionales",
        question: "¿Soy consciente de las heridas emocionales que me afectan y trabajo para sanarlas?",
        feedback: {
          0: "No reconocer tus heridas emocionales puede mantenerte en patrones de dolor y reactividad. Sanarlas libera tu energía y mejora tus relaciones. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, la Autocompasión, respiración holotrópica y constelaciones familiares del módulo Sanar, te acompañan en un proceso profundo de reconocimiento, comprensión e integración de tus experiencias emocionales.",
          1: "Reconoces algunas heridas y has trabajado en ellas, pero otras aún influyen en tu vida. Profundizar en su sanación te permitirá vivir con mayor libertad y confianza. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, la Autocompasión, respiración holotrópica y constelaciones familiares del módulo Sanar, te acompañan en un proceso profundo de reconocimiento, comprensión e integración de tus experiencias emocionales.",
          2: "Has avanzado en la sanación de tus heridas emocionales, lo que te permite vivir más ligero y en paz. Consolidar este proceso te dará aún más fortaleza emocional. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, la Autocompasión, respiración holotrópica y constelaciones familiares del módulo Sanar, te acompañan en un proceso profundo de reconocimiento, comprensión e integración de tus experiencias emocionales.",
          3: "¡Muy bien! Reconocer y sanar tus heridas emocionales es clave para tu crecimiento. En Camino Vital, módulo Sanar, puedes seguir profundizando a través de los talleres Sanación de Heridas Emocionales, La Sombra, la Autocompasión, respiración holotrópica y constelaciones familiares."
        }
      },
      {
        id: "q9",
        key: "estres",
        label: "Manejo del estrés",
        question: "¿Cuento con estrategias efectivas para manejar el estrés y evitar que afecte mi salud y bienestar?",
        feedback: {
          0: "Vivir con estrés constante debilita tu salud física y emocional. Manejarlo bien mejora tu energía, concentración y estado de ánimo. En Camino Vital, los talleres de manejo creativo de las emociones, Respiración, Sistema Nervioso y Estrés, y TRE(tension & trauma release exercises) del módulo Estabilizar, te enseñan técnicas para calmar tu mente, regular tu cuerpo y prevenir el desgaste.",
          1: "En ocasiones logras manejar el estrés, pero otras te supera. Fortalecer tus recursos de regulación emocional te permitirá enfrentar retos sin perder equilibrio. En Camino Vital, los talleres de manejo creativo de las emociones, Respiración, Sistema Nervioso y Estrés, y TRE del módulo Estabilizar, te enseñan técnicas para calmar tu mente, regular tu cuerpo y prevenir el desgaste.",
          2: "Sueles manejar bien el estrés, lo que protege tu salud y tu ánimo. Sin embargo, integrar más herramientas puede prevenir recaídas. En Camino Vital, los talleres de manejo creativo de las emociones, Respiración, Sistema Nervioso y Estrés, y TRE del módulo Estabilizar, te enseñan técnicas para calmar tu mente, regular tu cuerpo y prevenir el desgaste.",
          3: "¡Excelente! Manejar el estrés con eficacia es una habilidad vital. En Camino Vital, puedes reforzarla y ampliarla con los talleres de manejo creativo de las emociones, Respiración, Sistema Nervioso y Estrés, y TRE del módulo Estabilizar."
        }
      },
      {
        id: "q10",
        key: "autocompasion",
        label: "Relación compasiva con uno mismo",
        question: "¿Me trato a mí mismo / a con amabilidad y comprensión, especialmente en momentos de dificultad?",
        feedback: {
          0: "Ser duro contigo mismo aumenta la culpa y la ansiedad, dificultando tu bienestar. La autocompasión fortalece tu resiliencia y tu autoestima. En Camino Vital, el taller Autocompasión: la llave para sanar desde el amor propio, del módulo Sanar, te enseña a ser tu propio aliado en momentos difíciles.",
          1: "A veces logras ser compasivo contigo mismo, pero en otras te exiges demasiado. Practicar la autocompasión de forma constante te dará más paz y confianza. En Camino Vital, el taller Autocompasión: la llave para sanar desde el amor propio, del módulo Sanar, te enseña a ser tu propio aliado en momentos difíciles.",
          2: "La mayoría de las veces te tratas con amabilidad, lo que mejora tu bienestar. Aumentar la consistencia de esta práctica te dará mayor equilibrio emocional. En Camino Vital, el taller Autocompasión: la llave para sanar desde el amor propio, del módulo Sanar, te enseña a ser tu propio aliado en momentos difíciles.",
          3: "¡Muy bien! Mantener una relación compasiva contigo mismo fortalece tu resiliencia. En Camino Vital puedes seguir profundizando en esta habilidad a través del taller Autocompasión: la llave para sanar desde el amor propio, del módulo Sanar."
        }
      }
    ]
  },
  {
    key: "mental",
    label: "Mental",
    variables: [
      {
        id: "q11",
        key: "atencion",
        label: "Manejo de la atención",
        question: "¿Puedo dirigir y mantener mi atención en lo que es importante, evitando distracciones innecesarias?",
        feedback: {
          0: "Vivir con la atención dispersa reduce tu productividad, aumenta el estrés y dificulta disfrutar el presente. Cultivar la atención plena(mindfulness) mejora tu concentración y claridad mental. En Camino Vital, aprenderás técnicas de respiración y mindfulness en los módulos Estabilizar, Sanar y Crecer, mediante talleres de meditación, Respiración, Sistema Nervioso y Estrés, generación de estados de bienestar y manejo creativo de las emociones.",
          1: "A veces logras mantener tu atención, pero en otras te dejas arrastrar por distracciones. Fortalecer esta habilidad te permitirá aprovechar mejor tu tiempo y energía. En Camino Vital, aprenderás técnicas de respiración y mindfulness en los módulos Estabilizar, Sanar y Crecer, mediante talleres de meditación, Respiración, Sistema Nervioso y Estrés, generación de estados de bienestar y manejo creativo de las emociones.",
          2: "Sueles mantener la atención en lo importante, lo que te permite cumplir tus objetivos. Perfeccionar esta capacidad te ayudará a aumentar tu eficiencia y bienestar mental. En Camino Vital, aprenderás técnicas de respiración y mindfulness en los módulos Estabilizar, Sanar y Crecer, mediante talleres de meditación, Respiración, Sistema Nervioso y Estrés, generación de estados de bienestar y manejo creativo de las emociones.",
          3: "¡Muy bien! Manejar tu atención con eficacia es clave para un rendimiento óptimo. En Camino Vital puedes seguir ampliando tu capacidad de enfoque a través de los talleres de meditación, Respiración, Sistema Nervioso y Estrés, generación de estados de bienestar y manejo creativo de las emociones."
        }
      },
      {
        id: "q12",
        key: "responsabilidad",
        label: "Responsabilidad y auto empoderamiento",
        question: "¿Asumo la responsabilidad de mis decisiones y actúo para cambiar lo que está en mis manos?",
        feedback: {
          0: "Vivir desde la posición de víctima limita tus opciones y tu capacidad de acción. Desarrollar la responsabilidad te permite crear cambios positivos y sentirte dueño de tu vida. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica y Constelaciones Familiares, entre otros, fortalecen tu autoconsciencia y tu capacidad de responder de manera consciente y responsable.",
          1: "A veces tomas responsabilidad de tus acciones, pero en otras culpas a factores externos. Fortalecer esta habilidad te permitirá avanzar con más determinación. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica y Constelaciones Familiares, entre otros, fortalecen tu autoconsciencia y tu capacidad de responder de manera consciente y responsable.",
          2: "Asumes la responsabilidad en la mayoría de situaciones, lo que te da seguridad y claridad. Pulir esta habilidad te permitirá influir de manera más positiva en tu entorno. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica y Constelaciones Familiares, entre otros, fortalecen tu autoconsciencia y tu capacidad de responder de manera consciente y responsable.",
          3: "¡Excelente! Actuar desde la responsabilidad y el empoderamiento personal es clave para el éxito. En Camino Vital puedes seguir reforzando tus habilidades con los talleres: Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica y Constelaciones Familiares, entre otros."
        }
      },
      {
        id: "q13",
        key: "resiliencia",
        label: "Resiliencia consciente",
        question: "¿Soy capaz de adaptarme a las dificultades y recuperarme de ellas aprendiendo de la experiencia?",
        feedback: {
          0: "La falta de resiliencia consciente puede dejarte atrapado en el dolor o la frustración. Desarrollarla te permite crecer incluso en momentos difíciles. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares y Meditación fortalecen tu resiliencia y tu capacidad para manejar el dolor y las situaciones adversas.",
          1: "A veces logras sobreponerte a las dificultades, pero no siempre integras el aprendizaje. Mejorar tu resiliencia consciente te dará mayor fortaleza interior. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares y Meditación fortalecen tu resiliencia y tu capacidad para manejar el dolor y las situaciones adversas.",
          2: "Te adaptas bien a los cambios y recuperas tu energía después de las dificultades. Afianzar esta capacidad te permitirá enfrentar la vida con más confianza. En Camino Vital, los talleres Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares y Meditación fortalecen tu resiliencia y tu capacidad para manejar el dolor y las situaciones adversas.",
          3: "¡Muy bien! La resiliencia consciente te ayuda a transformar las crisis en crecimiento. En Camino Vital puedes seguir fortaleciendo la capacidad de resiliencia con los talleres: Sanar las Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares y Meditación."
        }
      },
      {
        id: "q14",
        key: "vision",
        label: "Visión creativa",
        question: "¿Uso mi pensamiento para imaginar, visualizar y diseñar el futuro que deseo?",
        feedback: {
          0: "No tener una visión creativa te deja sin rumbo y te hace reaccionar más que crear. Desarrollarla te ayuda a trazar un camino y a generar motivación para alcanzarlo. En Camino Vital, el taller Visualización Creativa del módulo Crecer, te enseña a imaginar, planificar y proyectar tu vida de manera intencional y consciente.",
          1: "A veces tienes ideas para tu futuro, pero no siempre las conviertes en planes claros. Mejorar tu visión creativa te permitirá orientar tus acciones hacia lo que realmente quieres. En Camino Vital, el taller Visualización Creativa del módulo Crecer, te enseña a imaginar, planificar y proyectar tu vida de manera intencional y consciente.",
          2: "Sueles imaginar y planificar tu futuro, lo que te da dirección y motivación. Perfeccionar esta habilidad te permitirá lograr resultados más consistentes. En Camino Vital, el taller Visualización Creativa del módulo Crecer, te enseña a imaginar, planificar y proyectar tu vida de manera intencional y consciente.",
          3: "¡Excelente! Tener una visión creativa clara te mantiene enfocado y motivado. En Camino Vital puedes seguir fortaleciendo tu capacidad para utilizar tu pensamiento creativo con el taller Visualización Creativa del módulo Crecer."
        }
      }
    ]
  },
  {
    key: "existencial",
    label: "Existencial",
    variables: [
      {
        id: "q15",
        key: "proposito",
        label: "Propósito de vida",
        question: "¿Tengo claro mi propósito de vida y vivo de manera alineada con él?",
        feedback: {
          0: "No tener un propósito claro puede dejarte sintiendo que la vida carece de dirección y significado. Conectarte con tu propósito te da motivación y sentido profundo a tus acciones. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          1: "A veces sientes que tienes un propósito, pero no siempre logras vivir alineado con él. Fortalecer esta conexión te permitirá tomar decisiones más coherentes. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          2: "Con frecuencia vives alineado con tu propósito, lo que te da claridad y energía. Afinar esta conexión hará que tus decisiones sean aún más potentes. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          3: "¡Excelente! Vivir plenamente alineado con tu propósito es una fuente de realización profunda. En Camino Vital puedes seguir nutriendo esta claridad con los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica."
        }
      },
      {
        id: "q16",
        key: "valores",
        label: "Conexión con valores, habilidades y pasiones",
        question: "¿Conozco mis valores, habilidades y pasiones, y los integro en mi vida cotidiana?",
        feedback: {
          0: "No tener claridad sobre tus valores y habilidades puede hacerte vivir desconectado de lo que te motiva y fortalece. Reconocerlos y aplicarlos impulsa tu autenticidad. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          1: "A veces conectas con tus valores y pasiones, pero no siempre las integras en tu vida. Fortalecer esta conexión te permitirá sentirte más pleno y motivado. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          2: "Con frecuencia vives desde tus valores y habilidades, lo que te da fuerza y dirección. Consolidar esta práctica puede llevar tu vida a mayor coherencia. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          3: "¡Muy bien! Vivir desde tus valores y pasiones es esencial para una vida plena. En Camino Vital puedes seguir fortaleciendo esta conexión con los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica."
        }
      },
      {
        id: "q17",
        key: "trascendencia",
        label: "Sentido de trascendencia",
        question: "¿Me siento parte de algo más grande que yo y conecto con un sentido de trascendencia?",
        feedback: {
          0: "No sentirte parte de algo más grande puede generar vacío existencial y dejarte más vulnerable al estrés, la ansiedad y la depresión. El sentido de trascendencia amplía tu visión y compromiso con la vida, y actúa como un factor protector que aporta calma, dirección y resiliencia. En Camino Vital, los talleres Propósito de Vida, Constelaciones Familiares, Meditación, Imaginación Guiada con Música y las sesiones de Respiración Holotrópica te ayudan a descubrir y clarificar lo que realmente da sentido a tu existencia.",
          1: "A veces conectas con algo más grande, pero esa experiencia no es constante, lo que puede dejarte sin un ancla sólida para afrontar crisis o tensiones. Al fortalecerla, ganarás serenidad y una base estable para reducir ansiedad, estrés y desánimo. En Camino Vital, los talleres de Propósito de Vida, Meditación, Respiración Holotrópica y Constelaciones Familiares pueden ayudarte a lograrlo.",
          2: "Con frecuencia sientes conexión con algo más grande, lo que te da serenidad, propósito y capacidad para mantener la calma ante la presión. Si no se cultiva, este recurso interno puede debilitarse y perder su efecto protector contra depresión, ansiedad y estrés. En Camino Vital, los talleres de Propósito de Vida, Meditación, Respiración Holotrópica y Constelaciones Familiares pueden ayudarte a lograrlo.",
          3: "¡Excelente! Vivir con sentido de trascendencia te conecta con un propósito más amplio y fortalece tu equilibrio emocional, ayudándote a mantenerte estable y positivo frente a retos y adversidades. En Camino Vital puedes seguir explorándolo a través de los talleres de Propósito de Vida, Meditación, Respiración Holotrópica y Constelaciones Familiares, entre otros."
        }
      },
      {
        id: "q18",
        key: "sentido_dolor",
        label: "Sentido frente al dolor y el sufrimiento",
        question: "¿Encuentro significado y aprendizaje en las experiencias de dolor y sufrimiento?",
        feedback: {
          0: "Ver el dolor solo como un enemigo puede dejarte atrapado en la queja o el resentimiento. Aprender de él y verlo como algo que hace parte de la vivencia humana te fortalece y amplía tu compasión. En Camino Vital, los talleres Heridas Emocionales, La Sombra, Autocompasión, Meditación, Respiración Holotrópica y Constelaciones Familiares te ayudan a resignificar experiencias difíciles transformándolas en aprendizaje y sabiduría.",
          1: "A veces logras encontrar un sentido en el dolor, pero no siempre integras lo aprendido. Profundizar en ello te dará mayor fortaleza interior. En Camino Vital, los talleres Heridas Emocionales, La Sombra, Autocompasión, Meditación, Respiración Holotrópica y Constelaciones Familiares te ayudan a resignificar experiencias difíciles transformándolas en aprendizaje y sabiduría.",
          2: "Has encontrado sentido en muchas experiencias difíciles, lo que te ha fortalecido. Consolidar esta visión te permitirá vivir con más serenidad. En Camino Vital, los talleres Heridas Emocionales, La Sombra, Autocompasión, Meditación, Respiración Holotrópica y Constelaciones Familiares te ayudan a resignificar experiencias difíciles transformándolas en aprendizaje y sabiduría.",
          3: "¡Muy bien! Encontrar sentido en el dolor te da resiliencia y sabiduría. En Camino Vital puedes seguir profundizando en esta habilidad con los talleres: Heridas Emocionales, La Sombra, Autocompasión, Meditación, Respiración Holotrópica y Constelaciones Familiares, entre otros."
        }
      },
      {
        id: "q19",
        key: "vida_muerte",
        label: "Afrontamiento consciente de la vida y la muerte",
        question: "¿Reflexiono y me preparo conscientemente para vivir y morir con serenidad?",
        feedback: {
          0: "Evitar pensar en la muerte puede dejarte sin aprovechar la vida plenamente y aumentar el miedo o la negación cuando enfrentes pérdidas o tu propia finitud. Afrontarla conscientemente te permite vivir con más intensidad y paz. En Camino Vital, talleres como Meditación, Respiración Holotrópica y Constelaciones Familiares ayudan a explorar este tema profundo de manera segura.",
          1: "A veces piensas en la vida y la muerte, pero no lo haces con una mirada integradora, lo que puede impedirte vivir con serenidad ante la incertidumbre. Profundizar en este aspecto te permitirá valorar más tu tiempo y relaciones. Camino Vital ofrece espacios como Meditación, Respiración Holotrópica y Constelaciones Familiares para acompañarte.",
          2: "Reflexionas sobre la vida y la muerte con cierta regularidad, lo que te da madurez y serenidad. No seguir profundizando podría hacer que esta visión se debilite y pierda su efecto protector en momentos difíciles. Camino Vital ofrece espacios como Meditación, Respiración Holotrópica y Constelaciones Familiares para acompañarte.",
          3: "¡Excelente! Vivir con consciencia de la muerte te permite honrar más la vida y afrontar con serenidad lo inevitable. En Camino Vital puedes seguir fortaleciendo esta actitud con talleres como Meditación, Respiración Holotrópica y Constelaciones Familiares."
        }
      }
    ]
  },
  {
    key: "espiritual",
    label: "Espiritual",
    variables: [
      {
        id: "q20",
        key: "espiritualidad",
        label: "Reconocimiento de la dimensión espiritual",
        question: "¿Reconozco mi dimensión espiritual y la diferencio de la religión?",
        feedback: {
          0: "No reconocer tu dimensión espiritual puede limitar tu comprensión de ti mismo y tu conexión con la vida. Diferenciarla de la religión te abre a una experiencia más libre y personal. En Camino Vital, los talleres de Meditación, Respiración Holotrópica, Imaginación Guiada con Música y Constelaciones Familiares de los módulos Sanar y Crecer, te ayudan a explorar esta dimensión desde una mirada amplia e inclusiva.",
          1: "A veces conectas con tu dimensión espiritual, pero no la integras en tu vida diaria. Profundizar en ella puede aumentar tu sentido de propósito y bienestar. En Camino Vital, los talleres de Meditación, Respiración Holotrópica, Imaginación Guiada con Música y Constelaciones Familiares de los módulos Sanar y Crecer, te ayudan a explorar esta dimensión desde una mirada amplia e inclusiva.",
          2: "Con frecuencia reconoces tu espiritualidad y la vives con apertura. Consolidar esta práctica te permitirá experimentar mayor serenidad y sentido. En Camino Vital, los talleres de Meditación, Respiración Holotrópica, Imaginación Guiada con Música y Constelaciones Familiares de los módulos Sanar y Crecer, te ayudan a explorar esta dimensión desde una mirada amplia e inclusiva.",
          3: "¡Muy bien! Vivir en contacto con tu dimensión espiritual enriquece todas tus áreas de vida. En Camino Vital puedes seguir profundizando en esta habilidad con los talleres de Meditación, Respiración Holotrópica, Imaginación Guiada con Música y Constelaciones Familiares de los módulos Sanar y Crecer."
        }
      },
      {
        id: "q21",
        key: "introspeccion",
        label: "Introspección y reflexión interior",
        question: "¿Dedico tiempo a la introspección para comprender mis pensamientos, emociones y motivaciones profundas?",
        feedback: {
          0: "No dedicar tiempo a la introspección puede dejarte desconectado de tus verdaderas necesidades y deseos. La reflexión interior es clave para tomar decisiones más sabias. En Camino Vital, talleres como Propósito de Vida, Meditación, Respiración Holotrópica, Constelaciones Familiares, La Sombra y Autocompasión facilitan este autoconocimiento.",
          1: "A veces reflexionas sobre tu vida, pero no de manera constante o profunda. Desarrollar este hábito puede darte claridad y dirección. En Camino Vital, talleres como Propósito de Vida, Meditación, Respiración Holotrópica, Constelaciones Familiares, La Sombra y Autocompasión facilitan este autoconocimiento.",
          2: "Con frecuencia practicas la introspección, lo que te ayuda a conocerte mejor y a vivir con coherencia. Mantener y profundizar esta práctica te dará más serenidad y enfoque. En Camino Vital, talleres como Propósito de Vida, Meditación, Respiración Holotrópica, Constelaciones Familiares, La Sombra y Autocompasión facilitan este autoconocimiento.",
          3: "¡Excelente! La introspección regular fortalece tu conexión contigo mismo y tu autenticidad. En Camino Vital los talleres como Propósito de Vida, Meditación, Respiración Holotrópica, Constelaciones Familiares, La Sombra y Autocompasión son aliados para seguir expandiéndola."
        }
      },
      {
        id: "q22",
        key: "conciencia",
        label: "Desarrollo de la conciencia",
        question: "¿Busco ampliar mi nivel de conciencia y percibir nuevas posibilidades de ser y actuar?",
        feedback: {
          0: "Vivir en un nivel de conciencia limitado puede hacer que repitas patrones y pierdas oportunidades de crecimiento. Expandirla te permite vivir con más libertad y creatividad. En Camino Vital, talleres como Respiración Holotrópica, Meditación y Constelaciones Familiares fomentan este proceso.",
          1: "A veces buscas ampliar tu conciencia, pero no lo haces de forma constante. Profundizar en ello te abrirá a nuevas maneras de ver y vivir la realidad. En Camino Vital, talleres como Respiración Holotrópica, Meditación y Constelaciones Familiares fomentan este proceso.",
          2: "Con frecuencia exploras maneras de ampliar tu conciencia, lo que te da apertura y flexibilidad. Consolidar este hábito potenciará tu crecimiento personal. En Camino Vital, talleres como Respiración Holotrópica, Meditación y Constelaciones Familiares fomentan este proceso.",
          3: "¡Muy bien! Ampliar la conciencia es un proceso continuo que nutre todas las dimensiones de tu vida. En Camino Vital, puedes seguir potenciando tu camino con los talleres de Respiración Holotrópica, Meditación y Constelaciones Familiares."
        }
      }
    ]
  },
  {
    key: "relacional",
    label: "Relacional",
    variables: [
      {
        id: "q23",
        key: "conflictos",
        label: "Manejo de conflictos",
        question: "¿Soy capaz de manejar los conflictos de manera constructiva, buscando soluciones y preservando las relaciones?",
        feedback: {
          0: "No saber manejar los conflictos puede generar distanciamiento, resentimiento y pérdida de vínculos importantes. Desarrollar esta habilidad permite construir relaciones más sanas y duraderas. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas para transformar los conflictos en oportunidades de entendimiento.",
          1: "A veces manejas los conflictos de manera constructiva, pero otras reaccionas de forma impulsiva o evasiva. Fortalecer esta capacidad te permitirá mantener relaciones más estables. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas para transformar los conflictos en oportunidades de entendimiento.",
          2: "Con frecuencia logras manejar los conflictos de forma positiva, lo que protege tus vínculos. Afianzar esta habilidad hará que tus relaciones sean más sólidas y enriquecedoras. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas para transformar los conflictos en oportunidades de entendimiento.",
          3: "¡Muy bien! Manejar conflictos de forma constructiva es un signo de madurez relacional. En Camino Vital puedes seguir ampliando tus recursos con los talleres de Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación."
        }
      },
      {
        id: "q24",
        key: "vinculos",
        label: "Calidad de vínculos",
        question: "¿Mantengo relaciones nutritivas, equilibradas y de apoyo mutuo?",
        feedback: {
          0: "Relaciones de baja calidad pueden desgastar tu energía, aumentar el estrés y limitar tu bienestar emocional. Cultivar vínculos sanos mejora tu confianza, alegría y estabilidad. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares, Manejo Creativo de la Comunicación y Autocompasión, entre otros, te ayudan a identificar y fortalecer tus relaciones.",
          1: "A veces tienes vínculos nutritivos, pero no siempre logras mantenerlos, lo que puede dejarte sin apoyo en momentos importantes. Mejorar esta área te dará mayor soporte emocional y bienestar general. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares, Manejo Creativo de la Comunicación y Autocompasión, entre otros, te ayudan a identificar y fortalecer tus relaciones.",
          2: "Sueles tener relaciones de calidad que aportan valor a tu vida y sostienen tu bienestar. No reforzarlas podría debilitar tu red de apoyo. Consolidar esta capacidad hará que tu círculo cercano sea más fuerte y resiliente. En Camino Vital, los talleres de Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares, Manejo Creativo de la Comunicación y Autocompasión, entre otros, te ayudan a identificar y fortalecer tus relaciones.",
          3: "¡Excelente! Mantener vínculos nutritivos es clave para una vida plena y estable. Si no los cuidas, podrían deteriorarse con el tiempo. En Camino Vital, puedes seguir profundizando este aspecto con los talleres de Heridas Emocionales, La Sombra, Respiración Holotrópica, Constelaciones Familiares, Manejo Creativo de la Comunicación y Autocompasión, entre otros."
        }
      },
      {
        id: "q25",
        key: "comunicacion",
        label: "Comunicación empática",
        question: "¿Escucho y me comunico con empatía, buscando comprender antes que responder?",
        feedback: {
          0: "La falta de comunicación empática puede generar malentendidos, distancias y tensiones innecesarias. Desarrollarla mejora la confianza y el entendimiento mutuo. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas que te enseñan a conectar y comunicarte desde el respeto, la empatía y la comprensión.",
          1: "A veces logras comunicarte con empatía, pero no siempre en momentos de tensión. Mejorar esta habilidad te permitirá fortalecer tus relaciones y evitar conflictos innecesarios. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas que te enseñan a conectar y comunicarte desde el respeto, la empatía y la comprensión.",
          2: "Con frecuencia te comunicas con empatía, lo que genera confianza y cercanía. Afianzar esta habilidad te permitirá llegar a acuerdos más fácilmente. En Camino Vital, talleres como Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación te dan herramientas que te enseñan a conectar y comunicarte desde el respeto, la empatía y la comprensión.",
          3: "¡Muy bien! La comunicación empática es un pilar de relaciones sanas y constructivas. En Camino Vital puedes seguir profundizando con los talleres de Manejo Creativo de las Emociones y Manejo Creativo de la Comunicación."
        }
      }
    ]
  }
]

// 2) STATE -------------------------------------------------------------------
const started = ref(false)
const showResults = ref(false)

// aplanar preguntas en orden (por dimensión, luego variable)
const questions = dimensions.flatMap(d => d.variables.map(v => ({ id: v.id, text: v.question, dimensionKey: d.key, variableKey: v.key })))
const totalQuestions = questions.length
const step = ref(0)
const answers = ref<Record<string, number>>({})

const options: Option[] = [
  { value: 0, label: 'Casi nunca' },
  { value: 1, label: 'Algunas veces' },
  { value: 2, label: 'A menudo' },
  { value: 3, label: 'Siempre' },
]

// 3) COMPUTED ---------------------------------------------------------------
const currentQuestion = computed(() => questions[step.value])

function answerFor(questionId: string) {
  return answers.value[questionId] ?? 0
}

function labelFromValue(v?: number) {
  const found = options.find(o => o.value === v)
  return found ? found.label : '—'
}

// puntajes por pilar (promedio % de sus variables)
const scores = computed(() => {
  return dimensions.map(d => {
    const vals = d.variables.map(v => answerFor(v.id))
    const pct = Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 3)) * 100)
    return { key: d.key, label: d.label, score: pct }
  })
})

const strongest = computed(() => scores.value.reduce((a, b) => (b.score > a.score ? b : a)))
const weakest = computed(() => scores.value.reduce((a, b) => (b.score < a.score ? b : a)))

const chartData = computed(() => ({
  labels: scores.value.map(s => s.label),
  datasets: [
    {
      label: 'Resultado',
      data: scores.value.map(s => s.score),
      fill: true,
      backgroundColor: 'rgba(66, 168, 252, 0.25)',
      borderColor: 'rgba(66, 168, 252, 1)',
      pointBackgroundColor: 'rgba(66, 168, 252, 1)'
    }
  ]
}))

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } }
  },
  plugins: { legend: { display: false } }
}

// 4) METHODS -----------------------------------------------------------------
function start() { started.value = true }
function selectOption(id: string, value: Option['value']) { answers.value[id] = value }
function nextStep() {
  if (step.value < totalQuestions - 1) step.value++
  else showResults.value = true
}
function prevStep() { if (step.value > 0) step.value-- }
function reset() { step.value = 0; answers.value = {}; showResults.value = false; started.value = false }

function feedbackFor(v: Variable) {
  const val = answerFor(v.id) as Option['value']
  return v.feedback[val] || ''
}
</script>

<template>
  <div v-if="store.openOnboarding">
    <div id="dialog" aria-labelledby="dialog-title"
      class="fixed inset-0 overflow-y-auto bg-transparent size-auto max-h-none max-w-none backdrop:bg-transparent">
      <div
        class="fixed inset-0 transition-opacity bg-primary/75 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
      </div>

      <div tabindex="0"
        class="flex items-end justify-center min-h-full p-4 text-center focus:outline-none sm:items-center sm:p-0">
        <div
          class="relative px-4 pt-5 pb-4 text-left transition-all transform bg-white shadow-xl rounded-3xl gradient-muted data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
          <div>
            <button class="absolute text-white cursor-pointer -top-10 -right-10 hover:text-secondary-estabilizar"
              @click.prevent="store.openOnboarding = false">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="mt-3 text-center sm:mt-5">
              <div class="max-w-2xl px-4 py-12 mx-auto">
                <!-- INTRO -->
                <div v-if="!started && !showResults" class="space-y-6 text-center">
                  <h1 class="text-3xl font-literata text-[color:var(--color-primary)]">Bienvenido a tu
                    Onboarding</h1>
                  <p class="text-[color:var(--color-paragraph)] max-w-xl mx-auto">
                    Responde preguntas breves sobre 6 dimensiones del ser humano. Al final te mostraremos
                    tu resultado por <strong>pilar</strong> con un gráfico y recomendaciones
                    por <strong>variable</strong>.
                  </p>
                  <button @click="start"
                    class="px-6 py-3 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)] transition-colors">
                    Comenzar
                  </button>
                </div>

                <!-- WIZARD -->
                <div v-else-if="started && !showResults">
                  <!-- progress -->
                  <div class="flex items-center mb-6">
                    <div class="flex-1 h-2 rounded-full bg-[color:var(--color-muted)] overflow-hidden">
                      <div class="h-full bg-[color:var(--color-secondary-sanar)] transition-all"
                        :style="{ width: `${((step + 1) / totalQuestions) * 100}%` }" />
                    </div>
                    <span class="ml-3 text-sm text-[color:var(--color-paragraph)]">
                      {{ step + 1 }} / {{ totalQuestions }}
                    </span>
                  </div>

                  <!-- question text (no variable shown) -->
                  <h2 class="text-2xl font-literata text-[color:var(--color-primary)] mb-4">
                    {{ currentQuestion.text }}
                  </h2>

                  <!-- options as button group -->
                  <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
                    <button v-for="opt in options" :key="opt.value" type="button"
                      @click="selectOption(currentQuestion.id, opt.value)" :class="[
                        'px-3 py-2 rounded-xl border text-sm transition-colors',
                        answers[currentQuestion.id] === opt.value
                          ? 'bg-[color:var(--color-secondary-crecer)] text-white border-transparent'
                          : 'bg-white hover:bg-[color:var(--color-muted)] border-[color:var(--color-muted)]'
                      ]">
                      {{ opt.label }}
                    </button>
                  </div>

                  <!-- nav -->
                  <div class="flex justify-between">
                    <button class="px-4 py-2 border rounded-xl" :disabled="step === 0" @click="prevStep">Atrás</button>
                    <button
                      class="px-4 py-2 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)]"
                      @click="nextStep">
                      {{ step === totalQuestions - 1 ? 'Ver resultados' : 'Siguiente' }}
                    </button>
                  </div>
                </div>

                <!-- RESULTS -->
                <div v-else>
                  <div class="grid grid-cols-1 gap-10 md:grid-cols-2">

                    <!-- details by variable -->
                    <div class="flex flex-col justify-start space-y-4">

                      <div
                        class="relative flex rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-muted shadow-xs outline-none">
                        <select v-model="currentDim" @change="currentSub = 0;"
                          class="z-10 w-full outline-none appearance-none">
                          <option v-for="(dim, index) in dimensions" :key="dim.key" :value="index">
                            {{ dim.label }}
                          </option>
                        </select>

                        <!-- Flecha custom -->
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            :class="['size-4']">
                            <path fill-rule="evenodd"
                              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>


                      <div class="overflow-hidden border rounded-2xl border-primary">
                        <div v-for="(v, subIndex) in dimensions[currentDim].variables" :key="v.key"
                          class="p-4 text-left border-t first:border-t-0 border-primary">
                          <div class="flex items-start justify-between gap-4 ">
                            <div @click.prevent="currentSub = subIndex" class="w-full">
                              <div class="flex items-center justify-between w-full">
                                <h4 class="font-semibold text-[color:var(--color-primary)]">
                                  {{ v.label }}</h4>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                  :class="['size-4 transform', { 'rotate-180': subIndex === currentSub }]">
                                  <path fill-rule="evenodd"
                                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                                </svg>
                              </div>
                              <div class="">
                                <p class="text-xs text-[color:var(--color-paragraph)]">
                                  Respuesta: {{ labelFromValue(answerFor(v.id)) }}</p>
                              </div>
                            </div>
                          </div>
                          <p v-if="currentSub === subIndex"
                            class="mt-2 text-[color:var(--color-primary)] whitespace-pre-line text-sm">
                            {{ feedbackFor(v) }}</p>
                        </div>
                      </div>

                    </div>

                    <!-- Graph -->
                    <div>
                      <div class="w-full h-80">
                        <Radar :data="chartData" :options="chartOptions" class="w-full h-full" />
                      </div>

                      <div class="mt-6 text-center">
                        <h3 class="mb-2 text-xl font-medium font-literata">Resumen por pilar</h3>
                        <p class="text-[color:var(--color-paragraph)]">
                          Fortaleza: <strong>{{ strongest.label }}</strong> ({{ strongest.score }}%).

                          Enfoque: <strong>{{ weakest.label }}</strong> ({{ weakest.score }}%).
                        </p>
                      </div>

                      <div class="flex justify-center gap-3 mt-10">
                        <button
                          class="px-4 py-2 transition-all duration-300 ease-in-out border rounded-xl border-primary hover:bg-primary hover:text-muted"
                          @click="reset">Repetir test</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>