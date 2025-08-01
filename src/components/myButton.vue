<template>
<div style="width: 60px; height: 45px; border-radius: 10px; background-color: var(--white);
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
  :style="{transform: `translateY(${+model * 8 - +hovering * 3 + 3}px)`,
  boxShadow: `inset 0px -10px 2px 2px var(--shadowMain)
  ${leftShadow ? ', inset 10px 0px 10px -5px var(--shadowLight)' : ''}
  ${rightShadow ? ', inset -10px 0px 10px -5px var(--shadowLight)' : ''}`}"
  @pointerdown="handleClick" @pointerenter="hovering = true" @pointerleave="hovering = false">
  <div style="margin-bottom: 10px; font-size: 12px; font-family: Consolas; font-weight: bold;"
    :style="{color: whiteText ? '#FFFA' : '#000A'}">{{ label }}</div>
</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useColor } from '../stores/colors'

const props = defineProps({
  label: {type: String, default: 'Hey!'},
  leftShadow: {type: Boolean, default: false},
  rightShadow: {type: Boolean, default: false}
})
const emits = defineEmits(['change'])
const model = defineModel()

const colors = useColor()

const hovering = ref(false)
const whiteText = ref(false)

watch(() => colors.paletteOption, (newOption, oldOption) => {
  checkWhiteText(colors.palettes[newOption].white)
})

onMounted(() => {
  checkWhiteText(colors.palettes[colors.paletteOption].white)
})

const handleClick = () => {
  model.value = !model.value
  emits('change')
}

const checkWhiteText = (color) => {
  let hex = color.replace(/^#/, '').toUpperCase()
  if (hex.length === 3) {hex = hex.split('').map(char => char + char).join('')}

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  const luminance = (Math.max(r, g, b) + Math.min(r, g, b)) / 2
  if (luminance >= 0.5) {whiteText.value = false}
  else {whiteText.value = true}  
}
</script>