<template>
<div style="width: 20px; height: 30px;position: relative;">
  <div style="position: absolute; top: -2px; left: 4px;">
    <up-one theme="filled" size="12" :fill="trend > 0 ? 'var(--highlight)' : 'var(--black)'" strokeLinejoin="miter"
      :class="{'glowing': trend > 0}"/>
  </div>
  <div style="position: absolute; top: 8px; left: 4px;">
    <down-one theme="filled" size="12" :fill="trend < 0 ? 'var(--highlight)' : 'var(--black)'" strokeLinejoin="miter"
      :class="{'glowing': trend < 0}"/>
  </div>
</div>
</template>

<script setup>
import { UpOne, DownOne } from '@icon-park/vue-next'

const props = defineProps({trend: {type: Number, default: 0}})
</script>

<style scoped>
span.glowing > *
{
  filter: drop-shadow(0px 0px 2px var(--highlight))
}
</style>