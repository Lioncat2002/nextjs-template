type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | null;
	avatarUrl: string | null;
	isEmailVerified: boolean;
	passwordHash: string;
	lastLoginAt?: Date;

	organizations: OrgMembership[];
	createdAt: Date;
	updatedAt: Date;
};
