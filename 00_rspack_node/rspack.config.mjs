import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  return {
    entry: {
      main: "./src/index.ts",
    },
    target: "node",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
