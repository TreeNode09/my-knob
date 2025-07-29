<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin: 10px;
  padding: 5px 10px 10px 10px; background-color: #FFF; ; border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), inset 0px -5px 2px rgba(0, 0, 0, 0.1)">
  <digits :model="model"></digits>
  <div style="width: 30px;">
    <sort theme="filled" size="16" fill="#AAA" strokeLinejoin="miter"/>
  </div>
  <div style="width: 30px; height: 30px; background-color: #FFF; border-radius: 50%;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2), inset 0px -2px 1px rgba(0, 0, 0, 0.1);"
    @pointerdown="startDrag" @pointerover="changeCursor('ns-resize')"
    @pointerleave="() => {if (!dragging) {changeCursor('default')}}">
    <div style="width: 100%; height: 100%; display: flex; align-items: top; justify-content: center;
      border-radius: 50%; border: dotted 2px #DDD; box-sizing: border-box;"
      :style="{transform: `rotate(${currentAngle}deg)`, transition: dragging ? 'none' : 'all 0.2s'}">
      <div style="width: 0px; height: 50%; border-left: solid 2px #AAA;"></div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Sort } from '@icon-park/vue-next'
import digits from './digits.vue'

const props = defineProps({
  valuePerLap: {type: Number, default: 100},
  pixelPerLap: {type: Number, default: 300},
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

let lastY = -1

watch(() => model.value, (newValue, oldValue) => {
  if (!dragging.value) {
    currentAngle.value = newValue * 360 / props.valuePerLap
    currentValue.value = newValue    
  }
})

watch(() => dragging.value, (newValue, oldValue) => {
  if (newValue) {changeCursor('ns-resize')}
  else {changeCursor('default')}
})

onMounted(() => {
  model.value = props.default
  currentValue.value = model.value
  currentAngle.value = currentValue.value * 360 / props.valuePerLap
})

const startDrag = (event) => {
  lastY = event.screenY
  originalValue.value = currentValue.value
  dragging.value = true
}

const getMousePosition = (event) => {
  const dY = lastY - event.screenY
  const nextValue = currentValue.value + dY * props.valuePerLap / props.pixelPerLap

  if (nextValue >= props.max && dY >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dY <= 0) {currentValue.value = props.min}
  else {currentValue.value = nextValue}
  
  if (props.step === 0) {model.value = currentValue.value}
  else {model.value = Math.floor(currentValue.value / props.step) * props.step}

  currentAngle.value = model.value * 360 / props.valuePerLap
  lastY = event.screenY
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