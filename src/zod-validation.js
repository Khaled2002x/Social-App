import * as z from "zod";
export const loginSchema = z.object({
  email: z.string().nonempty("email is required").email("not valid email"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must be greater than 8 string"),
});
