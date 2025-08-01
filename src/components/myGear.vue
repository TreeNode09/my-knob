<template>
<div v-if="dragging" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 9999;"
  @pointermove="getMousePosition" @pointerup="dragging = false" @pointerout="cancelDrag">
</div>
<div style="margin: 10px">
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;
    padding: 5px 10px 10px 10px; background-color: var(--white); border-radius: 10px;
    box-shadow: 0px 5px 10px var(--shadowDark), inset 0px -5px 2px var(--shadowMain)">
    <digits :model="model"></digits>
    <div style="width: 50px; height: 20px; margin: 4px 10px 0 10px;
      display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between;">
        <minus theme="outline" size="9" :fill="dX < 0 ? 'var(--highlight)' : 'var(--black)'" stroke-width="8"
          :class="{'glowing': dX < 0}"/>
        <plus theme="outline" size="9" :fill="dX > 0 ? 'var(--highlight)' : 'var(--black)'" stroke-width="8"
          :class="{'glowing': dX > 0}"/>
    </div>
  </div>
  <div style="width: 90px; height: 25px; margin-left: 60px; overflow: hidden;
    display: flex; align-items: flex-end; justify-content: center;
    box-shadow: 0px -13px 3px -12px var(--shadowDark)">
    <div style="width: 70px; height: 70px; margin-bottom: 10px; border-radius: 50%;
      box-shadow: 0px 5px 10px var(--shadowDark); transition: all var(--transition-time);"
      :style="{transform: `translateY(${active ? '0': '-3px'})`}">
      <div style="width: 70px; height: 70px; border-radius: 50%; box-sizing: border-box;
        display: flex; align-items: center; justify-content: center; outline: dashed 3px var(--white);
        background: radial-gradient(var(--dark) 0, var(--white) 55%, var(--white) 60%, var(--main) 60%, var(--light) 63%, var(--main) 66%, var(--white) 70%);"
        :style="{transform: `rotate(${currentAngle}deg)`, transition: dragging ? 'none' : 'all var(--transition-time)'}"
        @pointerdown="startDrag" @pointerover="changeCursor('ew-resize')"
        @pointerleave="() => {if (!dragging) {changeCursor('default')}}">
        <div style="width: 56px; height: 56px; border-radius: 50%;
          background: repeating-conic-gradient(#0000 0, #0000 9%, var(--main) 9%, var(--main) 10%);"></div>
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
const dX = ref(NaN)

const active = ref(false)
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
  dX.value = event.screenX - lastX
  const nextValue = currentValue.value + dX.value * props.valuePerLap / props.pixelPerLap

  if (nextValue >= props.max && dX.value >= 0) {currentValue.value = props.max}
  else if (nextValue <= props.min && dX.value <= 0) {currentValue.value = props.min}
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
  if (newCursor !== 'default') {active.value = true}
  else {
    active.value = false
    dX.value = NaN
  }
}
</script>

<style scoped>
span.glowing > *
{
  filter: drop-shadow(0px 0px 2px var(--highlight))
}
</style>