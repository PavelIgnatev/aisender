"use client";

import Link from "next/link";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "@/app/actions/user-action";

import { ViewUsers } from "./view-users";

const notificationErrorDescription =
  "Не удалось получить пользователей в проекте, пожалуйста, попробуйте снова";

const breadcrumbItems = [
  {
    title: <Link href="/admin">Админ панель</Link>,
  },
  {
    title: "Пользователи",
  },
];

const tableColumns = [
  {
    title: "Уникальный идентификатор",
    dataIndex: "key",
    key: "key",
    render: (id: string) => <Link href={`/admin/users/${id}`}>{id}</Link>,
  },
  {
    title: "Почта",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Последний вход",
    dataIndex: "lastSignInAt",
    key: "lastSignInAt",
  },
  {
    title: "Дата регистрации",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

export const ViewUsersContainer = () => {
  const [query, setQuery] = useState("");
  const { user, isLoaded } = useUser();

  const {
    isFetching: tableDataLoading,
    data: tableData,
    error: tableDataError,
    refetch: tableDataRefetch,
  } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getUserList(query),
  });


  const handleSearch = (search: string) => {
    setQuery(search);
  };

  useEffect(() => {
    tableDataRefetch();
  }, [query]);

  useEffect(() => {
    if (tableDataError) {
      notification.open({
        message: "Произошла ошибка",
        description: notificationErrorDescription,
        type: "error",
      });
    }
  }, [tableDataError]);

  useEffect(() => {
    if (user && isLoaded) {
      const { isSuperAdmin, isAdmin } = user.publicMetadata;

      if (!isSuperAdmin && !isAdmin) {
        redirect("/workspace");
      }
    }
  }, [user, isLoaded]);

  return (
    <ViewUsers
      tableColumns={tableColumns}
      tableData={tableData}
      tableDataLoading={tableDataLoading}
      breadcrumbItems={breadcrumbItems}
      onSearch={handleSearch}
    />
  );
};
