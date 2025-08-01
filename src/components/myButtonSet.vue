<template>
<div style="height: 30px; display: flex; flex-direction: row; align-items: flex-end; justify-content: center;
  margin: 10px; padding: 5px 10px 10px 10px; background-color: var(--white); border-radius: 10px;
  box-shadow: 0px 5px 10px var(--shadowDark), inset 0px -5px 2px var(--shadowMain)">
  <div v-for="(label, index) in labels" style="height: 45px; overflow: hidden; transition: all 0.3s;
    display: flex; align-items: end;"
    :style="{borderRadius: `${index === 0 ? '10px ' : '0'} ${index === model.length - 1 ? '10px 10px' : '0 0'} ${index === 0 ? '10px ' : '0'}`,
    boxShadow: `inset 0px -10px 0px 0px var(--shadowDark),
    0px ${model[index] ? '5' : '8'}px 10px -8px var(--shadowDark)`}">
    <my-button v-model="model[index]" :label="label"
      :left-shadow="index > 0 && (model[index - 1] === false && model[index] === true)"
      :right-shadow="index < model.length - 1 && (model[index + 1] === false && model[index] === true)"
      @change="handleChange(index)"></my-button>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import myButton from './myButton.vue'

const props = defineProps({
  labels: {type: Array, default: ['Hey!']},
  single: {type: Boolean, default: false},
})
const model = defineModel()

const emits = defineEmits(['change'])

const handleChange = (currentIndex) => {
  if (props.single === true) {
    model.value.forEach((element, index) => {
      if (currentIndex !== index) {model.value[index] = false}
    })
  }
  emits('change')
}
</script>