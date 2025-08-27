import { membershipColumns } from "@/src/features/membership/table/member-column-def";
import { DataTable } from "@/src/shared/ui/data-table";
import { getAllMembershipsUsecase } from "@/src/usecases/membership/membership";
import { MemberPageActions } from "@/src/widgets/page-actions/member-page-actions";

type MembersPageProps = {
	params: Promise<{ companyId: string }>;
};

export default async function MembersPage({ params }: MembersPageProps) {
	const { companyId } = await params;
	const members = await getAllMembershipsUsecase(companyId);

	return (
		<main className="space-y-4">
			<MemberPageActions />
			<DataTable columns={membershipColumns} data={members} />
		</main>
	);
}
