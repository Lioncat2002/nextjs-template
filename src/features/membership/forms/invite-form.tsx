"use client";
import { roleColors } from "@/src/entities/access/constants";
import { ROLE_NAMES } from "@/src/entities/access/types";
import { Button } from "@/src/shared/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUser } from "../../user/user-context";
import { useInviteMember } from "../use-invite-member";
import {
	AddMembershipFormSchema,
	type AddMembershipFormValues,
} from "./schema";

export const InviteMemberForm = () => {
	const { execute, isExecuting } = useInviteMember();
	const { companyId } = useParams<{ companyId: string }>();
	const { user } = useUser();
	const form = useForm<AddMembershipFormValues>({
		resolver: zodResolver(AddMembershipFormSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "",
		},
	});

	const onSubmit = (values: AddMembershipFormValues) => {
		console.log("Submitting invite:", values);
		execute({
			email: values.email,
			name: values.name,
			role: values.role,
			companyId: companyId,
			inviterId: user.id,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="user@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										{ROLE_NAMES.map((role) => (
											<SelectItem key={role} value={role}>
												<span
													className={`px-2 py-1 rounded-md text-xs font-medium ${roleColors[role]}`}
												>
													{role}
												</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isExecuting}>
					{isExecuting && <LoaderCircle className="animate-spin" />}Invite
				</Button>
			</form>
		</Form>
	);
};
