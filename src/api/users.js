const BASE_URL = "https://user.sportza.club";

function authHeaders(token) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function throwApiError(res, fallback) {
  const errorData = await res.json().catch(() => ({}));
  throw new Error(errorData.detail || errorData.title || errorData.message || fallback);
}

export async function updateUser({ userId, token, displayName, phone }) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ user: { id: userId, displayName, phone, isActive: true } }),
  });

  if (!res.ok) await throwApiError(res, "Failed to update profile");
}

export async function deleteUser({ userId, token }) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await throwApiError(res, "Failed to delete account");
}

export async function getChildren({ userId, token }) {
  const res = await fetch(`${BASE_URL}/users/${userId}/children`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await throwApiError(res, "Failed to load children");
  return res.json();
}

export async function createChild({ userId, token, name, dateOfBirth }) {
  const res = await fetch(`${BASE_URL}/users/${userId}/children`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ child: { name, dateOfBirth } }),
  });

  if (!res.ok) await throwApiError(res, "Failed to add child");
  return res.json();
}

export async function getNotificationPreferences({ userId, token }) {
  const res = await fetch(`${BASE_URL}/users/${userId}/notification-preferences`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) await throwApiError(res, "Failed to load notification preferences");
  return res.json();
}

export async function setNotificationPreference({ userId, token, type, isEnabled }) {
  const res = await fetch(`${BASE_URL}/users/${userId}/notification-preferences/${type}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ preference: { isEnabled } }),
  });

  if (!res.ok) await throwApiError(res, "Failed to update notification preference");
  return res.json();
}
