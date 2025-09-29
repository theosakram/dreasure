"use client";

import { TableContainer } from "@/components/containers/TableContainers";
import { ActionMenu } from "@/components/custom/ActionMenu";
import { useGetProfiles } from "@/features/profiles/profileHooks";
import { Profile } from "@/features/profiles/profileTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const MembersContent = () => {
  const { data, isLoading, error, refetch } = useGetProfiles();
  const { count, profiles } = data || {};
  const router = useRouter();

  const handleAddMember = () => {};

  // Action handlers
  const handleDetail = (id: string) => {
    router.push(`/members/detail/${id}`);
  };

  const handleEdit = (user: Profile) => {
    console.log("Edit user:", user.fullname);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (user: Profile) => {
    console.log("Delete user:", user.fullname);
    // TODO: Show confirmation dialog and delete user
  };

  const columnHelper = createColumnHelper<Profile>();
  const columns = [
    columnHelper.accessor("fullname", {
      header: "Nama Lengkap",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "No. Handphone",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.display({
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
    <TableContainer
      title="Daftar Anggota"
      subtitle="Kelola data anggota organisasi"
      data={profiles || []}
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
      onAddClick={handleAddMember}
      pagination={{
        total: count || 0,
        pageSize: 10,
        currentPage: 1,
        onPageChange: console.log,
      }}
    />
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
