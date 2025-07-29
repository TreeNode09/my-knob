<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin: 10px;
  padding: 5px 10px 10px 10px; position: relative; background-color: #FFF; border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5), inset 0px -5px 2px rgba(0, 0, 0, 0.2)">
  <div id="outer" ref="spin" style="width: 100px; height: 100px; border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center;
    background: repeating-conic-gradient(#FFF 0%, #EEE 1%, #EEE 2%, #CCC 3%, #DDD 3%, #EEE 5%);"
    :style="{transform: `rotate(${currentAngle}deg)`, transition: dragging ? 'none' : 'all 0.2s'}"
    @pointerdown="startDrag" @pointerover="changeCursor('grab')"
    @pointerleave="() => {if (!dragging) {changeCursor('default')}}"></div>
  <div id="inner" style="width: 75px; height: 75px; background-color: #fff; border-radius: 50%;
    position: absolute; top: 17.5px; left: 22.5px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.5);">
    <digits :model="model"></digits>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import digits from './digits.vue'

const props = defineProps({
  valuePerLap: {type: Number, default: 100},
  min: {type: Number, default: -100},
  max: {type: Number, default: 100},
  step: {type: Number, default: 1},
  default: {type: Number, default: 0}
})

const model = defineModel()

const currentAngle = ref(0)
const currentValue = ref(0)
const originalValue = ref(0)

const dragging = ref(false)

const spin = ref(null)

let centerX = 0, centerY = 0
let lastTheta = 0

watch(() => model.value, (newValue, oldValue) => {
  if (!dragging.value) {
    currentAngle.value = newValue * 360 / props.valuePerLap
    currentValue.value = newValue    
  }
})

watch(() => dragging.value, (newValue, oldValue) => {
  if (newValue) {changeCursor('grabbing')}
  else {changeCursor('default')}
})

onMounted(() => {
  model.value = props.default
  currentValue.value = model.value
  currentAngle.value = currentValue.value * 360 / props.valuePerLap
})

const startDrag = (event) => {
  if (event.target.id !== 'outer') {return}

  const spinInfo = spin.value.getBoundingClientRect()
  centerX = spinInfo.x + spinInfo.width / 2
  centerY = spinInfo.y + spinInfo.height / 2
  lastTheta = Math.atan2(event.clientY - centerY, event.clientX - centerX)

  originalValue.value = currentValue.value
  dragging.value = true
}

const getMousePosition = (event) => {
  let currentTheta = Math.atan2(event.clientY - centerY, event.clientX - centerX)
  let dTheta = currentTheta - lastTheta

  if (dTheta > 6) {dTheta -= 2 * Math.PI;}
  else if (dTheta < -6) {dTheta += 2 * Math.PI;}
  else if (dTheta > 3) {dTheta -= Math.PI;}
  else if (dTheta < -3) {dTheta += Math.PI;}

  const nextValue = currentValue.value + dTheta * props.valuePerLap / (2 * Math.PI)

  if (nextValue >= props.max && dTheta >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dTheta <= 0) {currentValue.value = props.min}
  else {currentValue.value = nextValue}

  if (props.step === 0) {model.value = currentValue.value}
  else {model.value = Math.floor(currentValue.value / props.step) * props.step}

  currentAngle.value = model.value * 360 / props.valuePerLap
  lastTheta = currentTheta
}

const cancelDrag = () => {
  currentValue.value = originalValue.value
  model.value = Math.floor(currentValue.value)
  currentAngle.value = currentValue.value * 360 / props.valuePerLap
  dragging.value = false
}

const changeCursor = (newCursor) => {
  const body = document.querySelector('body')
  body.style.cursor = newCursor
}
</script>