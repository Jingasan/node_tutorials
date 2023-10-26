/**
 * 環境変数の設定
 * テスト対象のコードに対して環境変数値を渡す
 */
interface Env {
  [key: string]: string;
}
export const env: Env = {
  ENV_NAME: "ENV_VALUE",
};
Object.keys(env).forEach((key) => {
  process.env[key] = env[key];
});

/**
 * テスト開始前に実行される関数
 */
export const setup = () => {
  console.log("Write test setup code here.");
};

/**
 * テスト終了後に実行される関数
 */
export const teardown = () => {
  console.log("Write test teardown code here.");
};
