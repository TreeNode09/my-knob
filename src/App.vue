<template>
<div style="background: repeating-linear-gradient(white 0, white 20px, #FDCE4380 20px, #FDCE4380 35px);">
  <div style="display: flex; flex-direction: column; align-items: start;
    background: repeating-linear-gradient(90deg, transparent 0, transparent 20px, #FDCE4380 20px, #FDCE4380 35px);">
    <my-knob v-model="value"></my-knob>
    <my-slider v-model="value"></my-slider>
    <my-spin v-model="value"></my-spin>
    <my-gear v-model="value"></my-gear>
  </div>  
</div>
</template>

<script setup>
import { ref } from 'vue'
import myKnob from './components/myKnob.vue'
import mySlider from './components/mySlider.vue'
import mySpin from './components/mySpin.vue'
import myGear from './components/myGear.vue'

const value = ref(0)
</script>

<style>
body, #app {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: DS-Digits;
  src: url('assets/DS-DIGIB-2.ttf');
}
</style>