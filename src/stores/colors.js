import { defineStore } from "pinia"
import { ref } from "vue"

export const useColor = defineStore('colors', () => {
    const palettes = ref([
        {
            white: '#FFF', light: '#EEE', main: '#DDD', dark: '#CCC', black: '#AAA',
            shadowLight: 'rgba(0, 0, 0, 0.1)', shadowMain: 'rgba(0, 0, 0, 0.2)', shadowDark: 'rgba(0, 0, 0, 0.5)'
        },
        {
            white: '#444', light: '#777', main: '#555', dark: '#444', black: '#777',
            shadowLight: 'rgba(0, 0, 0, 0.5)', shadowMain: 'rgba(0, 0, 0, 0.2)', shadowDark: 'rgba(0, 0, 0, 0.8)'            
        }
    ])
    const paletteOption = ref(1)

    const setOption = (option) => {
        paletteOption.value = option
    }

    return {palettes, paletteOption, setOption}
})