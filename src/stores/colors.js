import { defineStore } from "pinia"
import { ref } from "vue"

export const useColor = defineStore('colors', () => {
    const palettes = ref([
        {
            white: '#FFF', light: '#EEE', main: '#DDD', dark: '#CCC', black: '#AAA',
            shadowLight: 'rgba(0, 0, 0, 0.1)', shadowMain: 'rgba(0, 0, 0, 0.2)', shadowDark: 'rgba(0, 0, 0, 0.5)'
        },
        {
            white: '#999', light: '#888', main: '#777', dark: '#666', black: '#333',
            shadowLight: 'rgba(0, 0, 0, 0.5)', shadowMain: 'rgba(0, 0, 0, 0.2)', shadowDark: 'rgba(0, 0, 0, 0.8)'            
        }
    ])
    const paletteOption = ref(0)

    const setOption = (option) => {
        paletteOption.value = option
    }

    return {palettes, paletteOption, setOption}
})