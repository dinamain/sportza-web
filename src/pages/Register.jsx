import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await registerUser(form);
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 rounded-xl w-80">
        <h2 className="text-white text-xl font-bold mb-6 text-center">Register</h2>

        <input
          name="displayName"
          placeholder="Full Name"
          value={form.displayName}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300"
        >
          Register
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        {result && (
          <pre className="text-green-400 mt-3 text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </form>
    </div>
  );
}