import { z } from "zod";
export const signinValidator = z.object({
  username: z.string("username must be string"),
  password: z.string("password must be string"),
});
