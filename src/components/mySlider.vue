<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin: 10px;
  padding: 5px 10px 10px 10px; background-color: #FFF; ; border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5), inset 0px -5px 2px rgba(0, 0, 0, 0.2)">
  <digits :model="model"></digits>
  <div style="width: 16px; height: 16px; margin-top: 6px; background-color: #FFF; border-radius: 2px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2), inset 0px -2px 2px rgba(0, 0, 0, 0.1);
    display: flex; align-items: top; justify-content: center;"
    :style="{transform: `translateX(${currentDist + 16}px)`, transition: dragging ? 'none' : 'all 0.2s'}"
    @pointerdown="startDrag" @pointerover="changeCursor('ew-resize')"
    @pointerleave="() => {if (!dragging) {changeCursor('default')}}">
    <div style="width: 3px; height: 3px; border-radius: 50%; margin-top: 2px;
      background-color: #AAA;"></div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="width: calc(100% - 16px); height: 4px; border: 0; margin-bottom: 2px;
      border-left: solid 1px #DDD;  border-right: solid 1px #DDD;
      background: repeating-linear-gradient(90deg, #DDD, #DDD 1px, #0000 1px, #0000 4px, #DDD 4px, #DDD 5px);">
    </div>
    <div style="display: flex; font-display: row;">
      <div style="height: 16px; background-color: #EEE;
        border-radius: 2px; display: flex; align-items: center; justify-content: center;
        box-shadow: inset 0px -2px 5px rgba(0, 0, 0, 0.1), inset 0px 2px 5px rgba(0, 0, 0, 0.2);"
        :style="{'width': `${totalLength + 16}px`}">
        <div style="width: calc(100% - 16px); height: 4px; border-radius: 2px; background-color: #CCC;
          box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.2);"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import digits from './digits.vue'

const props = defineProps({
  totalLength: {type: Number, default: 100},
  totalPixel: {type: Number, default: 100},
  min: {type: Number, default: -100},
  max: {type: Number, default: 100},
  step: {type: Number, default: 5},
  default: {type: Number, default: 0}
})

const model = defineModel()

const currentDist = ref(0)
const currentValue = ref(0)
const originalValue = ref(0)

const dragging = ref(false)

let lastX = -1

watch(() => model.value, (newValue, oldValue) => {
  if (!dragging.value) {
    currentDist.value = props.totalLength * (newValue - props.min) / (props.max - props.min)
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
  currentDist.value = props.totalLength * (model.value - props.min) / (props.max - props.min)
})

const startDrag = (event) => {
  lastX = event.screenX
  originalValue.value = currentValue.value
  dragging.value = true
}

const getMousePosition = (event) => {
  const dX = event.screenX - lastX
  const nextValue = currentValue.value + dX * (props.max - props.min) / props.totalPixel

  if (nextValue >= props.max && dX >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dX <= 0) {currentValue.value = props.min}
  else {currentValue.value = nextValue}

  if (props.step === 0) {model.value = currentValue.value}
  else {model.value = Math.floor(currentValue.value / props.step) * props.step}
  
  currentDist.value = props.totalLength * (model.value - props.min) / (props.max - props.min)
  lastX = event.screenX
}

const cancelDrag = () => {
  currentValue.value = originalValue.value
  model.value = Math.floor(currentValue.value)
  currentDist.value = props.totalLength * (model.value - props.min) / (props.max - props.min)
  dragging.value = false
}

const changeCursor = (newCursor) => {
  const body = document.querySelector('body')
  body.style.cursor = newCursor
}
</script>