<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="margin: 10px">
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;
    padding: 5px 10px 10px 10px; background-color: #FFF; border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5), inset 0px -5px 2px rgba(0, 0, 0, 0.2)">
    <digits :model="model"></digits>
    <div style="width: 50px; height: 20px; margin: 4px 10px 0  10px;
      display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between;">
      <minus theme="outline" size="9" fill="#AAA"/>
      <plus theme="outline" size="9" fill="#AAA"/>
    </div>
  </div>
  <div style="width: 90px; height: 25px; margin-left: 60px; overflow: hidden;
    display: flex; align-items: flex-end; justify-content: center;
    box-shadow: 0px -13px 3px -12px rgba(0, 0, 0, 0.5)">
    <div style="width: 70px; height: 70px; margin-bottom: 10px; border-radius: 50%;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);">
      <div style="width: 70px; height: 70px; border-radius: 50%; box-sizing: border-box;
        display: flex; align-items: center; justify-content: center; outline: dashed 3px #FFF;
        background: radial-gradient(#AAA 0, #FFF 55%, #FFF 60%, #DDD 60%, #EEE 63%, #DDD 66%, #FFF 70%);"
        :style="{transform: `rotate(${currentAngle}deg)`, transition: dragging ? 'none' : 'all 0.2s'}"
        @pointerdown="startDrag" @pointerover="changeCursor('ew-resize')"
        @pointerleave="() => {if (!dragging) {changeCursor('default')}}">
        <div style="width: 56px; height: 56px; border-radius: 50%;
          background: repeating-conic-gradient(transparent 0, transparent 9%, #DDD 9%, #DDD 10%);"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Minus, Plus } from '@icon-park/vue-next'
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

let lastX = -1

watch(() => model.value, (newValue, oldValue) => {
  if (!dragging.value) {
    currentAngle.value = newValue * 360 / props.valuePerLap
    currentValue.value = newValue    
  }
})

watch(() => dragging.value, (newValue, oldValue) => {
  if (newValue) {changeCursor('ew-resize')}
  else {changeCursor('default')}
})

onMounted(() => {
  model.value = props.default
  currentValue.value = model.value
  currentAngle.value = currentValue.value * 360 / props.valuePerLap
})

const startDrag = (event) => {
  lastX = event.screenX
  originalValue.value = currentValue.value
  dragging.value = true
}

const getMousePosition = (event) => {
  const dX = event.screenX - lastX
  const nextValue = currentValue.value + dX * props.valuePerLap / props.pixelPerLap

  if (nextValue >= props.max && dX >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dX <= 0) {currentValue.value = props.min}
  else {currentValue.value = nextValue}
  
  if (props.step === 0) {model.value = currentValue.value}
  else {model.value = Math.floor(currentValue.value / props.step) * props.step}

  currentAngle.value = -model.value * 360 / props.valuePerLap
  lastX = event.screenX
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