import { z, ZodError } from "zod";

const personalScheme = z.object({
  name: z // 20文字以下,「\ / : *  ? " < >|」禁止の文字列(必須)
    .string()
    .min(1, { message: "NO_NAME" })
    .max(20, { message: "NAME_TOO_LONG" })
    .regex(/[^\\/:*?"<>|]/, { message: "INVALID_NAME" }),
  age: z // 正数値(必須)
    .number({ message: "NO_AGE" })
    .int({ message: "INVALID_AGE" })
    .positive({ message: "INVALID_AGE" }),
  email: z // メールアドレス(必須)
    .string()
    .min(1)
    .email({ message: "INVALID_EMAIL" }),
  job: z // 20文字以下,「\ / : *  ? " < >|」禁止の文字列(任意)
    .string()
    .max(20, { message: "JOB_TOO_LONG" })
    .regex(/[^\\/:*?"<>|]/, { message: "INVALID_JOB" })
    .optional(),
  testNumber: z // 数値, 独自のバリデーション
    .number()
    .refine(
      (t) => {
        if (0 <= t && t < 30) return true;
        if (60 < t && t <= 100) return true;
        return false;
      },
      { message: "INVALID_NUMBER" }
    ),
});
type Personal = z.infer<typeof personalScheme>;

/**
 * NGな入力例
 */
const ng: Personal = {
  name: "Tarooooooooooooooooooooooooooooooooooooo",
  email: "info",
  testNumber: 50.5,
};
console.log("[Variable]");
console.log(ng);

console.log("\n[Parse]");
try {
  personalScheme.parse(ng);
} catch (e) {
  if (e instanceof ZodError) console.error(e.errors);
}

console.log("\n[SafeParse]");
console.log(personalScheme.safeParse(ng).error.errors);

/**
 * OKな入力例
 */
const ok: Personal = {
  name: "Taro",
  email: "info@gmail.com",
  testNumber: 0,
  age: 20,
};
console.log(personalScheme.parse(ok));
console.log(personalScheme.safeParse(ok));
