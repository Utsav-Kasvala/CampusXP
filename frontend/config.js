export const BASE_URL = 'http://localhost:5000/api/v1';
export default defineConfig({
    optimizeDeps: {
      include: ["@react-three/drei", "@react-three/fiber"]
    }
  });