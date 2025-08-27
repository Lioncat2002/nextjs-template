"use client";

import type { RoleName } from "@/src/entities/access/types";
import type { OrgMembershipWithUser } from "@/src/entities/membership/types";
import type { ColumnDef } from "@tanstack/react-table";

import { roleColors } from "@/src/entities/access/constants";
import { formatDate } from "@/src/shared/lib/dates/format";
import { Badge } from "@/src/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const membershipColumns: ColumnDef<OrgMembershipWithUser>[] = [
	{
		accessorKey: "user",
		header: "User",
		cell: ({ row }) => {
			const user = row.getValue<OrgMembershipWithUser["user"]>("user");
			const initials =
				(user.displayName ?? user.email)?.charAt(0).toUpperCase() ?? "?";

			return (
				<div className="flex items-center space-x-3">
					<Avatar className="p-2 rounded-full h-12 w-12">
						<AvatarImage
							src={user.photoURL || undefined}
							alt={user.displayName || user.email}
							className="object-cover rounded-lg"
						/>
						<AvatarFallback className="flex items-center justify-center text-sm font-medium">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium leading-tight">
							{user.displayName || "Unnamed user"}
						</span>
						<span className="text-sm text-muted-foreground">{user.email}</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "user.phoneNumber",
		header: "Phone",
		cell: ({ row }) => {
			const phone = row.original.user.phoneNumber;
			return (
				<span className="text-sm text-muted-foreground">
					{phone || "No phone"}
				</span>
			);
		},
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			const role = row.getValue<RoleName>("role");
			const color = roleColors[role] ?? "bg-gray-100 text-gray-800";
			return (
				<Badge variant="secondary" className={color}>
					{role.toUpperCase()}
				</Badge>
			);
		},
	},
	{
		accessorKey: "user.emailVerified",
		header: "Email Status",
		cell: ({ row }) => {
			const verified = row.original.user.emailVerified;
			return (
				<Badge variant={verified ? "default" : "destructive"}>
					{verified ? "Verified" : "Unverified"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Joined",
		cell: ({ row }) => {
			const createdAt = row.getValue<Date>("createdAt");
			return <span className="text-sm">{formatDate(createdAt)}</span>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: "Last Updated",
		cell: ({ row }) => {
			const updatedAt = row.getValue<Date>("updatedAt");
			return (
				<span className="text-sm text-muted-foreground">
					{formatDate(updatedAt)}
				</span>
			);
		},
	},
];
