<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="width: 16px; height: 16px; margin-top: 6px; background-color: var(--white); border-radius: 2px;
  box-shadow: 0px 2px 5px var(--shadowMain), inset 0px -2px 2px var(--shadowLight);
  display: flex; align-items: top; justify-content: center;"
  :style="{transform: `translateX(${currentDist + 16}px) translateY(${active ? '-3px': '0'})`,
  transition: dragging ? 'none' : 'all var(--transition-time)'}"
  @pointerdown="startDrag" @pointerover="changeCursor('ew-resize')"
  @pointerleave="() => {if (!dragging) {changeCursor('default')}}">
  <div style="width: 3px; height: 3px; border-radius: 50%; margin-top: 2px;"
    :style="{backgroundColor: dragging ? 'var(--highlight)' : 'var(--black)',
    boxShadow: dragging ? '0px 0px 2px var(--highlight)' : 'none'}"></div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
  <div style="width: calc(100% - 16px); height: 4px; border: 0; margin-bottom: 2px;
    border-left: solid 1px var(--main);  border-right: solid 1px var(--main);
    background: repeating-linear-gradient(90deg, var(--main), var(--main) 1px, #0000 1px, #0000 4px, var(--main) 4px, var(--main) 5px);">
  </div>
  <div style="display: flex; font-display: row;">
    <div style="height: 16px; background-color: var(--light);
      border-radius: 2px; display: flex; align-items: center; justify-content: center;
      box-shadow: inset 0px -2px 5px var(--shadowLight), inset 0px 2px 5px var(--shadowMain);"
      :style="{'width': `${length + 16}px`}">
      <div style="width: calc(100% - 16px); height: 4px; border-radius: 2px; background-color: var(--dark);
        box-shadow: inset 0px 0px 2px var(--shadowMain);"></div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  length: {type: Number, default: 100},
  min: {type: Number, default: -100},
  max: {type: Number, default: 100},
  step: {type: Number, default: 5},
  default: {type: Number, default: 0}
})

const model = defineModel()

const currentDist = ref(0)
const currentValue = ref(0)
const originalValue = ref(0)

const active = ref(false)
const dragging = ref(false)

let lastX = -1

watch(() => model.value, (newValue, oldValue) => {
  if (!dragging.value) {
    currentDist.value = props.length * (newValue - props.min) / (props.max - props.min)
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
  currentDist.value = props.length * (model.value - props.min) / (props.max - props.min)
})

const startDrag = (event) => {
  lastX = event.clientX
  originalValue.value = currentValue.value
  dragging.value = true
}

const getMousePosition = (event) => {
  const dX = event.clientX - lastX
  const nextValue = currentValue.value + dX * (props.max - props.min) / props.length

  if (nextValue >= props.max && dX >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dX <= 0) {currentValue.value = props.min}
  else {currentValue.value = nextValue}

  if (props.step === 0) {model.value = currentValue.value}
  else {model.value = Math.floor(currentValue.value / props.step) * props.step}
  
  currentDist.value = props.length * (model.value - props.min) / (props.max - props.min)
  lastX = event.clientX
}

const cancelDrag = () => {
  currentValue.value = originalValue.value
  model.value = Math.floor(currentValue.value)
  currentDist.value = props.length * (model.value - props.min) / (props.max - props.min)
  dragging.value = false
}

const changeCursor = (newCursor) => {
  const body = document.querySelector('body')
  body.style.cursor = newCursor
  if (newCursor !== 'default') {active.value = true}
  else {active.value = false}
}
</script>

<style scoped>
.drag
{
  background-color: var(--highlight);
  box-shadow: 0px 0px 2px var(--highlight);
}
</style>