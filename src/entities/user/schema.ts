import { z } from "zod";

export const CreateUserSchema = z.object({
	displayName: z.string(),
	phoneNumber: z.string().optional(),
	photoURL: z.string().optional(),
	email: z.string().email(),
	firebaseUID: z.string().optional(),
	emailVerified: z.boolean(),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export const FirebaseMetaSchema = z.object({
	uid: z.string(),
	email: z.string().nullable(),
	displayName: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	photoURL: z.string().nullable(),
	emailVerified: z.boolean(),
});

export const LoginDataSchema = z.object({
	idToken: z.string().min(1, "Missing Firebase ID token"),
	meta: FirebaseMetaSchema,
});

export type LoginData = z.infer<typeof LoginDataSchema>;
