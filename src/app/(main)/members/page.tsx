"use client";

import { TableContainer } from "@/components/containers/TableContainers";
import { ActionMenu } from "@/components/custom/ActionMenu";
import { useGetUsers } from "@/features/users/userHooks";
import { User } from "@/features/users/userTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const MembersPage = () => {
  const { data: users, isLoading, error } = useGetUsers();
  const router = useRouter();

  // Action handlers
  const handleDetail = (id: string) => {
    router.push(`/members/detail/${id}`);
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user.fullname);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user.fullname);
    // TODO: Show confirmation dialog and delete user
  };

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("fullname", {
      header: "Nama Lengkap",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("position", {
      header: "Jabatan",
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
      data={users || []}
      columns={columns}
      isLoading={isLoading}
      isError={!!error}
      error={error ? "Gagal memuat data anggota" : undefined}
      emptyTitle="Belum ada data anggota"
      emptyDescription="Tambahkan anggota baru untuk melihat data di sini"
      emptyActionLabel="Tambah Anggota"
      addButtonLabel="Tambah Anggota"
      onRetry={() => window.location.reload()}
      striped
      interactive
    />
  );
};

export default MembersPage;
