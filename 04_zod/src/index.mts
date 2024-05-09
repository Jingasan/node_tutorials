import test from "node:test";
import { z, ZodError } from "zod";

const personalScheme = z.object({
  name: z
    .string()
    .min(1, { message: "NO_NAME" })
    .max(20, { message: "NAME_TOO_LONG" })
    .regex(/[^\\/:*?"<>|]/, { message: "INVALID_NAME" }),
  age: z
    .number({ message: "NO_AGE" })
    .int({ message: "INVALID_AGE" })
    .positive({ message: "INVALID_AGE" }),
  email: z.string().min(1).email({ message: "INVALID_EMAIL" }),
  job: z
    .string()
    .max(20, { message: "JOB_TOO_LONG" })
    .regex(/[^\\/:*?"<>|]/, { message: "INVALID_JOB" })
    .optional(),
  testNumber: z.number().refine(
    (t) => {
      if (0 <= t && t < 30) return true;
      if (60 < t && t <= 100) return true;
      return false;
    },
    { message: "INVALID_NUMBER" }
  ),
});
type Personal = z.infer<typeof personalScheme>;

const p: Personal = {
  name: "Tarooooooooooooooooooooooooooooooooooooo",
  email: "info",
  testNumber: 50,
};
console.log("[Variable]");
console.log(p);

console.log("\n[Parse]");
try {
  personalScheme.parse(p);
} catch (e) {
  if (e instanceof ZodError) console.error(e.errors);
}

console.log("\n[SafeParse]");
console.log(personalScheme.safeParse(p).error.errors);
