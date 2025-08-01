<template>
<div style="padding: 0px 5px; border-radius: 5px; background-color: #8B8; width: 50px;
  color: #333; font-weight: bold; font-family: DS-Digits;
  box-shadow: 0px -2px 2px var(--shadowLight), inset 0px 2px 5px var(--shadowLight);">
  <div v-if="props.model < 0" style="float: left">-</div>
  <div style="float: right;">{{ Math.abs(props.model).toFixed(0) }}</div>
</div>
</template>

<script setup>
const props = defineProps({model: {type: Number}})
</script>