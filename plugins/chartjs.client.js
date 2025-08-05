// ~/plugins/chartjs.client.ts
import { Chart as ChartJS, registerables } from 'chart.js'

// 👇 NO importes 'vue-chartjs' aquí
export default defineNuxtPlugin(() => {
  ChartJS.register(...registerables)   // deja listo Chart.js para todos los componentes
})