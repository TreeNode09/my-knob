<template>
<div style="display: flex; flex-direction: column; align-items: start; background-color: lightblue;"
  :style="{
    '--white': colors.palettes[colors.paletteOption].white,
    '--light': colors.palettes[colors.paletteOption].light,
    '--main': colors.palettes[colors.paletteOption].main,
    '--dark': colors.palettes[colors.paletteOption].dark,
    '--black': colors.palettes[colors.paletteOption].black,
    '--shadowLight': colors.palettes[colors.paletteOption].shadowLight,
    '--shadowMain': colors.palettes[colors.paletteOption].shadowMain,
    '--shadowDark': colors.palettes[colors.paletteOption].shadowDark,
    '--highlight': colors.palettes[colors.paletteOption].highlight
  }">
  <my-knob v-model="value"></my-knob>
  <my-slider v-model="value"></my-slider>
  <my-spin v-model="value"></my-spin>
  <my-gear v-model="value"></my-gear>
  <my-button-set v-model="options" :labels="labels" :single="true" @change="changePalette"></my-button-set>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useColor } from './stores/colors'
import myKnob from './components/myKnob.vue'
import mySlider from './components/mySlider.vue'
import mySpin from './components/mySpin.vue'
import myGear from './components/myGear.vue'
import myButtonSet from './components/myButtonSet.vue'

const colors = useColor()

const value = ref(0)
const labels = ref(['Light', 'Dark'])
const options = ref([true, false])

const changePalette = () => {
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i] === true) {
      colors.setOption(i)
      break
    }
  }
}
</script>

<style>
body, #app
{
  margin: 0;
  padding: 0;
}

*
{
  --transition-time: 0.5s;
  transition: background-color var(--transition-time);
}

@font-face {
  font-family: DS-Digits;
  src: url('assets/DS-DIGIB-2.ttf');
}
</style>