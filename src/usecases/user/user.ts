import { getUserByFirebaseUIDWithMemberships } from "@/src/entities/user/db";

export const getUserUseCase = async ({
	firebaseUID,
}: { firebaseUID: string }) => {
	const user = await getUserByFirebaseUIDWithMemberships(firebaseUID);
	if (!user) throw new Error("User not found");
	return user;
};
