import {defineConfig} from "vite";
import unpluginVue from "unplugin-vue/vite"
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
    plugins:[vue(),dts({

    })],
})