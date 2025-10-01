"use client";

import { AddOrgMembershipModal } from "@/components/containers/orgs/AddOrgMembershipModal";
import {
  profileColumnHelper,
  profileColumns,
} from "@/components/containers/profiles/ProfilesColumn";
import { TableContainer } from "@/components/containers/table/TableContainers";
import { ActionMenu } from "@/components/custom/ActionMenu";
import { useGetOrgMembersByOrgId } from "@/features/orgs/orgHooks";
import { Profile } from "@/features/profiles/profileTypes";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const MembersContent = () => {
  const router = useRouter();
  const { orgId } = useGetIdsFromParam();
  const { data, isLoading, error, refetch } = useGetOrgMembersByOrgId();
  const { count, data: members } = data || {};
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Action handlers
  const handleDetail = (userId: string) => {
    router.push(`/${orgId}/members/${userId}`);
  };

  const handleEdit = (user: Profile) => {
    console.log("Edit user:", user.fullname);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (user: Profile) => {
    console.log("Delete user:", user.fullname);
    // TODO: Show confirmation dialog and delete user
  };

  const columns = [
    ...profileColumns,
    profileColumnHelper.display({
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ActionMenu
          onDetail={() => handleDetail(row.original.id)}
          onEdit={() => handleEdit(row.original)}
          onDelete={() => handleDelete(row.original)}
        />
      ),
    }),
  ];

  return (
    <>
      <TableContainer
        title="Daftar Anggota"
        subtitle="Kelola data anggota organisasi"
        data={members?.map((m) => ({ ...m.user, role: m.role })) || []}
        columns={columns}
        isLoading={isLoading}
        isError={!!error}
        error={error ? "Gagal memuat data anggota" : undefined}
        emptyTitle="Belum ada data anggota"
        emptyDescription="Tambahkan anggota baru untuk melihat data di sini"
        emptyActionLabel="Tambah Anggota"
        addButtonLabel="Tambah Anggota"
        onRetry={refetch}
        interactive
        showAddButton
        onAddClick={() => setAddModalOpen(true)}
        pagination={{
          total: count || 0,
          pageSize: 10,
          currentPage: 1,
          onPageChange: console.log,
        }}
      />

      <AddOrgMembershipModal open={addModalOpen} setOpen={setAddModalOpen} />
    </>
  );
};

export const MembersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MembersContent />
    </Suspense>
  );
};

export default MembersPage;
