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
  <my-base>
    <digits :model="value"></digits>
    <my-signal-light1 :trend="dValue"></my-signal-light1>
    <my-knob v-model="value"></my-knob>
  </my-base>
  <my-base>
    <digits :model="value"></digits>
    <my-slider v-model="value"></my-slider>
  </my-base>
  <my-base>
    <my-spin v-model="value" :step="0">
      <digits :model="value"></digits>
    </my-spin>
  </my-base>
  <div style="margin: 10px">
    <my-base style="margin: 0;">
      <digits :model="value"></digits>
      <my-signal-light2 :trend="dValue"></my-signal-light2>
    </my-base>
    <my-gear v-model="value"></my-gear>
  </div>
  <my-base style="height: 30px; align-items: flex-end;">
    <my-button-set v-model="options" :labels="labels" :single="true" @change="changePalette"></my-button-set>
  </my-base>
  <my-gradient></my-gradient>
  <my-audio></my-audio>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useColor } from './stores/colors'

import myBase from './components/myBase.vue'
import digits from './components/digits.vue'

import myKnob from './components/myKnob.vue'
import mySignalLight1 from './components/mySignalLight1.vue'
import mySlider from './components/mySlider.vue'
import mySpin from './components/mySpin.vue'
import myGear from './components/myGear.vue'
import mySignalLight2 from './components/mySignalLight2.vue'
import myButtonSet from './components/myButtonSet.vue'
import myGradient from './components/myGradient.vue'
import myAudio from './components/myAudio.vue'

const colors = useColor()

const value = ref(0)
const dValue = ref(0)
const labels = ref(['Light', 'Dark','Aqua', 'Paper'])
const options = ref([true, false, false, false])

watch(() => value.value, (newValue, oldValue) =>{dValue.value = newValue - oldValue})

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
  transition: all var(--transition-time);
  user-select: none;
}

@font-face {
  font-family: DS-Digits;
  src: url('assets/DS-DIGIB-2.ttf');
}
</style>