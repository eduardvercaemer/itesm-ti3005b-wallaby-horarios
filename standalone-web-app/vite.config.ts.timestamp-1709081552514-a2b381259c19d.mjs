// vite.config.ts
import { defineConfig } from "file:///home/ed/Repo/itesm-ti3005b-wallaby-horarios/standalone-web-app/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///home/ed/Repo/itesm-ti3005b-wallaby-horarios/standalone-web-app/node_modules/@builder.io/qwik/optimizer.mjs";
import { qwikCity } from "file:///home/ed/Repo/itesm-ti3005b-wallaby-horarios/standalone-web-app/node_modules/@builder.io/qwik-city/vite/index.mjs";
import tsconfigPaths from "file:///home/ed/Repo/itesm-ti3005b-wallaby-horarios/standalone-web-app/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lZC9SZXBvL2l0ZXNtLXRpMzAwNWItd2FsbGFieS1ob3Jhcmlvcy9zdGFuZGFsb25lLXdlYi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2VkL1JlcG8vaXRlc20tdGkzMDA1Yi13YWxsYWJ5LWhvcmFyaW9zL3N0YW5kYWxvbmUtd2ViLWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9lZC9SZXBvL2l0ZXNtLXRpMzAwNWItd2FsbGFieS1ob3Jhcmlvcy9zdGFuZGFsb25lLXdlYi1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBxd2lrVml0ZSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrL29wdGltaXplclwiO1xuaW1wb3J0IHsgcXdpa0NpdHkgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKTogVXNlckNvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3F3aWtDaXR5KCksIHF3aWtWaXRlKCksIHRzY29uZmlnUGF0aHMoKV0sXG4gICAgc2VydmVyOiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csU0FBUyxvQkFBcUM7QUFDN1osU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhLE1BQWtCO0FBQzVDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUFBLElBQ2pELFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
