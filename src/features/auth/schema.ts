import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const RegisterSchema = z.object({
	displayName: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

export const ResetPasswordSchema = z.object({
	email: z.string().email(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
