import { z } from "zod";

export const validUser = z.object({
  username: z.string("username must be string"),
  password: z.string("password must be string"),
  email: z.email("provide valid email"),
});
