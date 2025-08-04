<template>
<div style="display: flex; flex-direction: row; margin: 10px 0">
  <input ref="beginInput" type="color" v-model="beginHex"></input>
  <button @click="beginInput.click()" style="border-radius: 50% 0 0 50%;"
    :style="{backgroundColor: beginHex}"></button>
  <div style="display: flex; flex-direction: column;">
    <div style="width: 200px; height: 20px" :style="{background: `linear-gradient(90deg, ${color})`}"></div>
    <div style="width: 200px; height: 20px; margin-top: 2px"
      :style="{background: `linear-gradient(90deg, ${beginHex} 0%, ${endHex} 100%)`}"></div>    
  </div>
  <button @click="endInput.click()" style="border-radius: 0 50% 50% 0;"
    :style="{backgroundColor: endHex}"></button>
  <input ref="endInput" type="color" v-model="endHex"></input>
</div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const color = ref('')
const beginHex = ref('#22FF3C')
const endHex = ref('#808020')

const beginInput = ref(null)
const endInput = ref(null)

const epochs = 100

watch(() => beginHex.value, (newValue, oldValue) => {getGradientHSL()})
watch(() => endHex.value, (newValue, oldValue) => {getGradientHSL()})
onMounted(() => {getGradientHSL()})

const getGradientHSL = () => {
  color.value = ''
  const beginColor = hex2hsl(beginHex.value)
  const endColor = hex2hsl(endHex.value)

  if (endColor.h > beginColor.h + 180) {endColor.h -= 360}
  else if (endColor.h < beginColor.h - 180) {endColor.h += 360}

  for (let i = 0; i < epochs; i ++) {
    let currentColor = {}
    currentColor.h = beginColor.h * (epochs - i) / epochs + endColor.h * i / epochs
    if (currentColor.h >= 360) {currentColor.h -= 360}
    else if (currentColor.h < 0) {currentColor.h += 360}
    currentColor.s = beginColor.s * (epochs - i) / epochs + endColor.s * i / epochs
    currentColor.l = beginColor.l * (epochs - i) / epochs + endColor.l * i / epochs

    const colorText = `hsl(${currentColor.h.toFixed(1)}, ${currentColor.s}%, ${currentColor.l}%) ${i * 100 / epochs}%, `
    color.value += colorText  
  }
  color.value += `hsl(${endColor.h.toFixed(1)}, ${endColor.s}%, ${endColor.l}%) 100%`
}

function hex2hsl(hex) {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  r /= 255, g /= 255, b /= 255
  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max == min) {h = s = 0}
  else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) {h = (g - b) / d + (g < b ? 6 : 0)}
    else if (max === g) {h = (b - r) / d + 2}
    else if (max === b) {h = (r - g) / d + 4}
  }
  h /= 6

  return { h: h * 360, s: s * 100, l: l * 100 }
}
</script>

<style scoped>
input[type="color"]
{
  width: 0;
  height: 0;
  opacity: 0;
}

button
{
  width: 50px;
  transition: box-shadow 0.3s;
}

button:hover
{
  border: none;
  box-shadow: inset 0px 0px 0px 50px #FFF8;
}

button:focus
{
  outline: none;
}
</style>