<template>
<div style="height: 30px; display: flex; flex-direction: row; align-items: flex-end; justify-content: center;
  margin: 10px; padding: 5px 10px 10px 10px; background-color: var(--white); border-radius: 10px;
  box-shadow: 0px 5px 10px var(--shadowDark), inset 0px -5px 2px var(--shadowMain)">
  <div style="height: 45px; border-radius: 10px; overflow: hidden; transition: all 0.3s; display: flex; align-items: end;"
    :style="{boxShadow: `inset 0px -10px 0px 0px var(--shadowDark),
    0px ${playing ? '5' : '8'}px 10px -8px var(--shadowDark)`}">
    <my-button v-model="playing" label="♫" large-text></my-button>
  </div>
  <div style="height: 100%; margin: auto 10px;">Open Console</div>
</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import myButton from './myButton.vue'

const audioContext = ref(null)
const audioBuffer = ref(null)
const sourceNode = ref(null)
const analyserNode = ref(null)

const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const frequencyData = ref(new Uint8Array(256))

let timeInterval = null
let consoleInterval = null
let animationFrame = null

const style = ref('')

const AUDIO_FILE_PATH = 'src/assets/CoffeeZone.mp3'

onMounted(() => {
  audioContext.value = new window.AudioContext()
  initAudio()

  consoleInterval = setInterval(() => {
    style.value = ''
    if (playing.value) {
      for (let i = 0; i < 100; i++) {
        const color = mapColor(frequencyData.value[i])
        style.value += `#${color} ${i}%, #${color} ${i + 1}%, `
      }
      style.value += `#${mapColor(frequencyData.value[100])} 100%`
      console.log(`%c${' '.repeat(70)}`, `background: linear-gradient(90deg, ${style.value})`)
    }
   }, 80)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  if (animationFrame) {cancelAnimationFrame(animationFrame)}
})

const initAudio = async() => {
  const response = await fetch(AUDIO_FILE_PATH)
  const arrayBuffer = await response.arrayBuffer()
  audioBuffer.value = await audioContext.value.decodeAudioData(arrayBuffer) 
  duration.value = audioBuffer.value.duration
  console.log("Ready!")
}

const updateFrequencyData = () => {
  if (analyserNode.value && playing.value) {
    analyserNode.value.getByteFrequencyData(frequencyData.value)
    animationFrame = requestAnimationFrame(updateFrequencyData)
  }
}

const mapColor = (frequency) => {
  const palettes = [
    {r: 48, g: 48, b: 48},
    {r: 93, g: 226, b: 241},
    {r: 255, g: 255, b: 255},
    {r: 255, g: 217, b: 0},
    {r: 228, g: 8, b: 10}
  ]
  const section = Math.floor(Math.max(Math.min(frequency, 255), 0) / 64)
  const ratio = (frequency - section * 64) / 64
  const result = {
    r: Math.floor(palettes[section].r * (1 - ratio) + palettes[section + 1].r * ratio),
    g: Math.floor(palettes[section].g * (1 - ratio) + palettes[section + 1].g * ratio),
    b: Math.floor(palettes[section].b * (1 - ratio) + palettes[section + 1].b * ratio)
  }
  return result.r.toString(16).padStart(2, '0')
    + result.g.toString(16).padStart(2, '0')
    + result.b.toString(16).padStart(2, '0')
}

watch(() => playing.value, (newValue, oldValue) => {
  if (!audioBuffer.value) {return}
  
  if (newValue === true) {
    if (!audioContext.value || !audioBuffer.value) {return}
    if (audioContext.value.state === 'suspended') {audioContext.value.resume()}

    sourceNode.value = audioContext.value.createBufferSource()
    sourceNode.value.buffer = audioBuffer.value
    
    analyserNode.value = audioContext.value.createAnalyser()
    analyserNode.value.fftSize = 256
    
    // 连接音频节点：source -> analyser -> destination
    sourceNode.value.connect(analyserNode.value)
    analyserNode.value.connect(audioContext.value.destination)
    
    sourceNode.value.start(0, currentTime.value)
    
    playing.value = true

    sourceNode.value.onended = () => {
      playing.value = false
      currentTime.value = 0
    }
    updateFrequencyData()

    timeInterval = setInterval(() => {
      if (playing.value && sourceNode.value) {
        currentTime.value += 0.1
        if (currentTime.value >= duration.value) {
          playing.value = false
          currentTime.value = 0
        }
      }
    }, 100)
  }

  else {
    if (sourceNode.value) {
      sourceNode.value.stop()
      sourceNode.value = null
    }
    if (animationFrame) {cancelAnimationFrame(animationFrame)}

    frequencyData.value.fill(0)

    playing.value = false
  }
})
</script>