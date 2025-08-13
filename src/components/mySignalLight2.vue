<template>
<div style="width: 50px; height: 20px; margin: 4px 10px 0 10px;
  display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between;">
  <minus theme="outline" size="9" :fill="trend < 0 ? 'var(--highlight)' : 'var(--black)'" stroke-width="8"
    :class="{'glowing': trend < 0}"/>
  <plus theme="outline" size="9" :fill="trend > 0 ? 'var(--highlight)' : 'var(--black)'" stroke-width="8"
    :class="{'glowing': trend > 0}"/>
</div>  
</template>

<script setup>
import { Minus, Plus } from '@icon-park/vue-next'

const props = defineProps({trend: {type: Number, default: 0}})
</script>

<style scoped>
span.glowing > *
{
  filter: drop-shadow(0px 0px 2px var(--highlight))
}
</style>