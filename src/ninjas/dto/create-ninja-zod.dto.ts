import { z } from 'zod';

export const createNinjaSchema = z
  .object({
    name: z.string(),
    weapon: z.string(),
  })
  .required();

export type CreateNinjaZodDto = z.infer<typeof createNinjaSchema>;
