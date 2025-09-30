<script setup>
const current = ref(0);
const faqs = [
    {
        "question": "¿Debo realizar los tres módulos del programa Camino Vital?",
        "answer": "<p>No necesariamente. Puedes inscribirte en el módulo que más resuene contigo o que responda a lo que necesitas en este momento.</p><p>Sin embargo, es importante tener en cuenta que los módulos tienen un orden progresivo:</p><ul><li>Para participar en el módulo <b>Sanar</b> (segundo), es necesario haber completado antes el módulo <b>Estabilizar</b> (primero).</li><li>Para ingresar al módulo <b>Crecer</b> (tercero), debes haber realizado previamente el módulo Sanar.</li></ul><p>De esta manera aseguramos que avances paso a paso, con una base sólida y coherente para tu proceso de transformación.</p>"
    },
    {
        "question": "¿Los talleres de Respiración Holotrópica solo pueden ser realizados por las personas que están en el programa Camino Vital?",
        "answer": "<p>No. Los talleres de Respiración Holotrópica® están abiertos tanto para quienes hacen parte de Camino Vital como para cualquier persona interesada en su proceso de sanación, autoconocimiento y crecimiento personal.</p><p>Pueden participar personas que:</p><ul><li>Estén atravesando una crisis y quieran encontrar un espacio seguro para procesar lo que viven.</li><li>Busquen fortalecer su proceso terapéutico individual.</li><li>Desean profundizar en el autoconocimiento y la expansión de la conciencia.</li><li>Estén interesadas en conectar con herramientas transformadoras para liberar bloqueos emocionales, físicos y mentales.</li></ul><p>Son espacios independientes que aportan beneficios profundos, y al mismo tiempo, se integran muy bien como complemento dentro de Camino Vital.</p>"
    },
    {
        "question": "¿Necesito estar en crisis para participar en Camino Vital?",
        "answer": "<p>No. Camino Vital no es solo para momentos de crisis. También es un proceso profundo de autoconocimiento y desarrollo personal, diseñado para quienes desean crecer, explorar nuevas posibilidades de vida y fortalecer sus recursos internos.</p><p>El programa te ofrece:</p><ul><li>Herramientas prácticas para gestionar tu energía, emociones y pensamientos.</li><li>Estrategias para mantener equilibrio en la vida cotidiana.</li><li>Un espacio seguro para profundizar en tu propósito y en tu dimensión espiritual.</li><li>La posibilidad de integrar cambios que se reflejan en todas tus relaciones y proyectos.</li></ul><p>En resumen, Camino Vital acompaña tanto a quienes buscan transformar una crisis como a quienes desean emprender un camino consciente de crecimiento y plenitud.</p>"
    },
    {
        "question": "¿El módulo Estabilizar me puede servir para manejar el estrés?",
        "answer": "<p>Sí. El módulo Estabilizar está diseñado para ofrecerte herramientas prácticas y efectivas que ayudan a:</p><ul><li>Manejar el estrés de manera consciente.</li><li>Prevenir el desgaste emocional, especialmente en personas que cuidan de otros o enfrentan alta presión laboral.</li><li>Reducir el riesgo de burnout.</li><li>Recuperar la energía y mejorar tu calidad de vida diaria.</li></ul><p>A través de prácticas de respiración, regulación emocional, hábitos de autocuidado y generación de estados de bienestar, este módulo te brinda recursos para construir una base sólida de equilibrio y serenidad en tu vida cotidiana.</p>"
    },
    {
        "question": "¿El programa Camino Vital puede realizarse de manera virtual?",
        "answer": "<p>Sí. El programa Camino Vital puede hacerse completamente de manera virtual, lo que permite que participes sin importar el lugar en el que te encuentres.</p><p>Para quienes tienen la posibilidad de asistir presencialmente, también se ofrecen espacios complementarios como talleres grupales y consultas individuales, que enriquecen la experiencia con el contacto directo.</p><p>De esta manera, el programa se adapta a tus necesidades y circunstancias, garantizando que puedas vivir el proceso integral tanto en formato virtual como presencial.</p>"
    },
    {
        "question": "¿Qué beneficios concretos puedo esperar al finalizar el programa?",
        "answer": "<p>Al finalizar Camino Vital habrás recorrido un proceso integral de treinta semanas en el que trabajas de manera vivencial las seis dimensiones del ser humano: física, emocional, mental, existencial, espiritual y relacional.</p><p>Los beneficios más destacados son:</p><ul><li>Mayor estabilidad y energía en tu vida diaria.</li><li>Sanación e integración emocional.</li><li>Herramientas prácticas para manejar el estrés y las emociones difíciles.</li><li>Claridad mental y resiliencia.</li><li>Un sentido más profundo de propósito y dirección vital.</li><li>Fortalecimiento de la dimensión espiritual.</li><li>Relaciones más sanas y auténticas.</li></ul><p>En resumen, Camino Vital te ofrece un mapa y una guía vivencial para transformar tu vida desde adentro hacia afuera, integrando recursos internos que te acompañarán mucho más allá del programa.</p>"
    },
    {
        "question": "¿Cuál es el nivel de compromiso requerido en términos de tiempo semanal?",
        "answer": "<p>El programa Camino Vital está diseñado para ser profundo pero al mismo tiempo compatible con la vida cotidiana.</p><ul><li><b>Tiempo semanal:</b> requiere en promedio tres horas a la semana, distribuidas entre los encuentros, prácticas personales y espacios de reflexión.</li><li><b>Talleres presenciales:</b> a lo largo de las 30 semanas se realizan 7 talleres presenciales de un día completo (sábados).</li><li><b>Sesiones de cierre:</b> al finalizar cada módulo tendrás una sesión de cierre grupal (sábados).</li></ul><p>En resumen, se trata de un compromiso constante pero flexible, que integra espacios semanales de aprendizaje y práctica con momentos presenciales más profundos.</p>"
    },
    {
        "question": "¿Se necesita alguna experiencia previa en psicoterapia, meditación u otras prácticas?",
        "answer": "<p>No. No necesitas ninguna experiencia previa.</p><p>En Camino Vital y en los talleres trabajamos paso a paso, desde lo más básico hasta prácticas más profundas, de manera accesible y acompañada.</p><p>El programa está diseñado para que cualquier persona, sin importar su punto de partida, pueda aprender herramientas efectivas para su vida cotidiana.</p><p>Lo único que se requiere es apertura y disposición para participar en el proceso.</p>"
    },
    {
        "question": "¿Cuáles son las contraindicaciones para practicar Respiración Holotrópica®?",
        "answer": "<p>La Respiración Holotrópica®, creada por Stanislav y Christina Grof, es una técnica poderosa que activa estados ampliados de conciencia. Precisamente por esa intensidad, no todas las personas pueden practicarla de manera segura.</p><p><b>Contraindicaciones médicas principales</b></p><ul><li>Problemas cardiovasculares.</li><li>Cirugías recientes o fracturas importantes.</li><li>Epilepsia.</li><li>Embarazo.</li><li>Antecedentes de glaucoma.</li></ul><p><b>Contraindicaciones psicológicas</b></p><ul><li>Psicosis activa.</li><li>Trastorno bipolar.</li><li>Estados de disociación graves.</li></ul><p><b>Recomendación general:</b> Antes de participar en un taller, cada persona completa un formulario de salud para evaluar riesgos. En caso de dudas médicas o psicológicas, siempre es recomendable consultar con un profesional de confianza.</p><p>En Camino Vital la seguridad y el cuidado son prioritarios: la técnica se facilita en un entorno seguro y acompañado por profesionales capacitados.</p>"
    },
    {
        "question": "¿Qué pasa si no puedo asistir a una de las sesiones?",
        "answer": "<p>Sabemos que pueden surgir imprevistos. Por eso, el programa ofrece varias alternativas para que no te pierdas el proceso:</p><ul><li><b>Acceso a grabaciones:</b> Las sesiones quedan grabadas.</li><li><b>Sesiones grupales:</b> Puedes traer tus dudas a los encuentros semanales.</li><li><b>Sesiones individuales:</b> Espacio de acompañamiento individual para resolver inquietudes.</li></ul><p>De esta manera, aunque no puedas asistir en vivo a una sesión, siempre tendrás opciones para ponerte al día y continuar avanzando en tu camino.</p>"
    }
]
</script>

<template>
    <ul class="grid w-full grid-cols-1 divide-y-2 divide-dashed divide-muted">
        <li v-for="(item, index) in faqs" :key="index" class="">
            <button type="button" @click.prevent="current = index"
                class="flex items-center justify-between w-full transition-all duration-300 ease-in-out cursor-pointer hover:text-secondary-crecer group">
                <h4 class="title text-2xl font-public text-primary group-hover:!text-secondary-crecer py-8 text-left w-5/6">
                    {{ item?.question }}
                </h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clip-rule="evenodd" />
                    <path fill-rule="evenodd"
                        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <div :class="['transition-all duration-300 ease-in-out overflow-hidden content', { 'h-0 opacity-0': current !== index }, { 'h-auto opacity-100 mb-5': current === index }]"
                v-html="item?.answer">
            </div>
        </li>
    </ul>
</template>