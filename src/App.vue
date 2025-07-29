<template>
<div style="background: repeating-linear-gradient(#A1EFE9 0, #A1EFE9 25px, #69BFB8 25px, #69BFB8 26px);">
  <div style="display: flex; flex-direction: column; align-items: start;
    background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0, transparent 5px, transparent 15px, #69BFB8 15px, #69BFB8 16px);">
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