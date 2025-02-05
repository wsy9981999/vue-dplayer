import {defineConfig} from "vite";
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue(), dts({
        tsconfigPath: 'tsconfig.build.json', rollupTypes: true
    })], build: {
        lib: {
            entry: './src/player.vue', name: 'vue-dplayer', formats: ['es', 'cjs', 'umd'],
        }, rollupOptions: {
            external: ['vue', 'dplayer'], output: {
                globals: {
                    vue: 'Vue', dplayer: 'dplayer'
                }
            }
        }
    }
})