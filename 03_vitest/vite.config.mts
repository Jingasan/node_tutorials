/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 30000, // １テストのタイムアウト[ms]
    hookTimeout: 30000, // １フックのタイムアウト[ms]
    globalSetup: ["src/test/setup.mts"], // テストのセットアップコード
    include: ["src/test/**/*.spec.{ts,mts,tsx}"], // 参照するテストコード
  },
});
