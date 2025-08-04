import { defineStore } from "pinia"
import { ref } from "vue"

export const useColor = defineStore('colors', () => {
    const palettes = ref([
        {
            white: '#FFF',
            light: '#EEE',
            main: '#DDD',
            dark: '#CCC',
            black: '#AAA',
            shadowLight: 'rgba(0, 0, 0, 0.1)',
            shadowMain: 'rgba(0, 0, 0, 0.2)',
            shadowDark: 'rgba(0, 0, 0, 0.5)',
            highlight: '#4C9EF8'
        },
        {
            white: '#444',
            light: '#777',
            main: '#555',
            dark: '#444',
            black: '#777',
            shadowLight: 'rgba(0, 0, 0, 0.2)',
            shadowMain: 'rgba(0, 0, 0, 0.5)',
            shadowDark: 'rgba(0, 0, 0, 0.8)',
            highlight: '#F6CE4B'
        },
        {
            white: '#02808F',
            light: '#03C39A',
            main: '#01A897',
            dark: '#02808F',
            black: '#03C39A',
            shadowLight: 'rgba(2, 32, 44, 0.2)',
            shadowMain: 'rgba(2, 32, 44, 0.5)',
            shadowDark: 'rgba(2, 32, 44, 0.8)',
            highlight: '#F0F3BC'
        },
        {
            white: '#E3C7A0',
            light: '#DCB57F',
            main: '#D3A35F',
            dark: '#D09A4E',
            black: '#BF8A40',
            shadowLight:'rgba(122, 71, 0,  0.2)',
            shadowMain:'rgba(122, 71, 0, 0.4)',
            shadowDark:'rgba(122, 71, 0, 0.8)',
            highlight: '#FFF2E0'
        }
    ])
    const paletteOption = ref(0)

    const setOption = (option) => {
        paletteOption.value = option
    }

    return {palettes, paletteOption, setOption}
})