import * as esbuild from "esbuild";
import dependencies from "./package.json";

// esbuildによるビルド処理
await esbuild.build({
  entryPoints: [{ in: "src/index.mts", out: "index" }],
  // エントリポイントと生成されるビルドファイル名(複数指定可能)
  outdir: "dist", // ビルドファイルの出力先ディレクトリ
  //outfile: "dist/index.js", // ビルドファイル名
  platform: "node", // ビルド対象のプラットフォーム：node/browser/neutral
  format: "esm", // 出力フォーマットの指定(デフォルト：iife)
  // cjs: CommonJSモジュールとして出力する（Node.js向け）
  // esm: ECMAScriptモジュールとして出力する（Node.js向け）
  // iife: 即時関数として出力する（ブラウザ向け）
  // esm-browser: ブラウザ用のECMAScriptモジュールとして出力する（ブラウザ向け）
  target: ["ES2022"], // 出力するJSのバージョンや実行環境の指定
  // 指定しない場合はesbuildが自動的に実行環境に応じたコードに変換する。
  // esnext: 最新のECMAScriptの仕様に準拠したコードを生成
  // es2022, ..., es2015(ES6): ECMAScriptのバージョンの指定
  // nodeXX.X: Node.jsのバージョンの指定
  // chromeXX, firefoxXX, safariXX, edgeXX: ブラウザバージョンの指定
  outExtension: {
    ".js": ".mjs", // ESM形式で出力されることを明示
  },
  bundle: true, // バンドルする（ビルド成果物をまとめる）かどうか
  minify: true, // コードを最小化するかどうか
  sourcemap: false, // SourceMapを出力するかどうか
  external: Object.keys(dependencies), // バンドルに含めるべきでない外部パッケージの指定
  // esbuildはデフォルトではすべての依存関係を含めてバンドルするが、
  // 外部パッケージをバンドルに含めると、サイズが不必要に大きくなる。
  // externalオプションでは、バンドルに含めない外部パッケージを指定し、
  // バンドルに含めず、外部から読み込むことを前提とする。
  logLevel: "info",
  // ビルド時に表示するログのレベル：verbose/debug/info/warning/error/silent
  metafile: true, // ビルド後に結果のメタファイルを出力するかどうか
  banner: {
    // commonjs用ライブラリをESMプロジェクトでbundleする際に生じることのある問題への対策
    js: 'import { createRequire } from "module"; import url from "url"; const require = createRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  },
});
