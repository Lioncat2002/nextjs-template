type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | null;
	avatarUrl: string | null;
	isEmailVerified: boolean;
	passwordHash: string;
	lastLoginAt: number | null;

	organizations: UserMembership[];
	createdAt: number | null;
	updatedAt: number | null;
};
