const BASE_URL = "https://user.sportza.club";

export async function registerUser({ email, password, displayName, phone }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, displayName, phone }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}