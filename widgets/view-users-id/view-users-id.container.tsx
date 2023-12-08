"use client";

import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { notification } from "antd";
import { useEffect, useMemo } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById, updateUser } from "@/app/actions/user-action";
import { useUser } from "@clerk/nextjs";

import { ViewUsersId } from "./view-users-id";

type updateUserData = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isManager: boolean;
};

const notificationErrorDescription =
  "Не удалось получить информацию по конкретному пользователю, пожалуйста, попробуйте снова";

const breadcrumbItems = [
  {
    title: <Link href="/admin">Админ панель</Link>,
  },
  {
    title: <Link href="/admin/users">Пользователи</Link>,
  },
];

export const ViewUsersIdContainer = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();

  const {
    isFetching: userByIdLoading,
    data: userByIdData,
    error: userByIdError,
    refetch: userByIdRefetch,
  } = useQuery({
    queryKey: ["userById"],
    queryFn: () => getUserById(String(id)),
  });

  const { mutate, isPending: isSaveUserInfoLoading } = useMutation({
    mutationFn: (data: updateUserData) => updateUser(String(id), data),
    onSuccess: () => {
      notification.open({
        message: "Информация о пользователе успешно обновлена",
        type: "success",
      });
      userByIdRefetch();
    },
    onError: () =>
      notification.open({
        message: "Произошла ошибка при обновлении информации о пользователе",
        type: "error",
      }),
  });

  const { isSuperAdmin, isAdmin } = useMemo(() => {
    if (user && isLoaded) {
      const { publicMetadata } = user;

      return publicMetadata;
    }

    return {};
  }, [user, isLoaded]);

  useEffect(() => {
    if (userByIdError) {
      notification.open({
        message: "Произошла ошибка",
        description: notificationErrorDescription,
        type: "error",
      });
    }
  }, [userByIdError]);

  useEffect(() => {
    if (user && isLoaded && !isSuperAdmin && !isAdmin) {
      redirect("/workspace");
    }
  }, [isSuperAdmin, isAdmin, user, isLoaded]);

  return (
    <ViewUsersId
      breadcrumbItems={[
        ...breadcrumbItems,
        {
          title: userByIdData?.email ? userByIdData.email : id,
        },
      ]}
      loading={userByIdLoading || isSaveUserInfoLoading}
      data={userByIdData}
      isSuperAdmin={Boolean(isSuperAdmin)}
      isAdmin={Boolean(isAdmin)}
      onFinish={(v) => mutate(v)}
    />
  );
};
