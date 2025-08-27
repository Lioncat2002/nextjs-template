import type { Invitation } from "@/generated/prisma";
import type { InvitationStatus as PrismaInvitationStatus } from "@/generated/prisma";

export type CompanyInvitation = Invitation;
export type InvitationStatus = PrismaInvitationStatus;
