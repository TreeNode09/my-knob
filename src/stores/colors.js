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
            white: '#FFF9FB',
            light: '#FFE6EB',
            main: '#FFB7C5',
            dark: '#F7A1BB',
            black: '#F28CAB',
            shadowLight: 'rgba(231, 84, 128, 0.1)',
            shadowMain: 'rgba(231, 84, 128, 0.2)',
            shadowDark: 'rgba(231, 84, 128, 0.4)',
            highlight: '#E75480'
        },
        {
            white: '#FFFFFF',
            light: '#E6F7FF',
            main: '#80CCFF',
            dark: '#66C2FF',
            black: '#7F9AA8',
            shadowLight: 'rgba(0, 149, 255, 0.15)',
            shadowMain: 'rgba(0, 149, 212, 0.25)',
            shadowDark: 'rgba(0, 149, 212, 0.35)',
            highlight: '#00D18F'
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