"use server";

import { User, createClerkClient } from "@clerk/nextjs/server";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  // нужная настройка
  httpOptions: { cache: "no-cache" },
});

function mapUser(user: User) {
  const {
    id,
    emailAddresses,
    createdAt,
    lastSignInAt,
    firstName,
    lastName,
    primaryEmailAddressId,
    publicMetadata,
  } = user;

  const {
    isSuperAdmin = false,
    isAdmin = false,
    isManager = false,
  } = publicMetadata as {
    isSuperAdmin?: boolean;
    isAdmin?: boolean;
    isManager?: boolean;
  };

  const { emailAddress: email } =
    emailAddresses.find((data) => data.id === primaryEmailAddressId) ||
    emailAddresses[0];

  return {
    key: id,
    email,
    createdAt: new Date(createdAt).toLocaleDateString("ru-RU"),
    lastSignInAt: lastSignInAt
      ? new Date(lastSignInAt).toLocaleDateString("ru-RU")
      : null,
    firstName,
    isSuperAdmin,
    isAdmin,
    isManager,
    lastName,
  };
}

export async function getUserList(query: string) {
  const users = await clerk.users.getUserList({
    orderBy: "-created_at",
    query,
  });

  return users.map(mapUser);
}

export async function getUserById(userId: string) {
  const user = await clerk.users.getUser(userId);

  if (!user) {
    return null;
  }

  return mapUser(user);
}

export async function updateUser(
  userId: string,
  updates: {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isManager: boolean;
  }
) {
  const { firstName, lastName, isAdmin, isSuperAdmin, isManager } = updates;

  const updatedUser = await clerk.users.updateUser(userId, {
    firstName,
    lastName,
    publicMetadata: { isAdmin, isSuperAdmin, isManager },
  });

  return mapUser(updatedUser);
}
