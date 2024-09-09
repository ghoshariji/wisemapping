import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make sure 'process.env.IS_PREACT' is defined for the library expecting it
    'process.env.IS_PREACT': JSON.stringify(true),
    // Optionally, define the entire process.env object if needed for other purposes
    'process.env': {}
  },
})
