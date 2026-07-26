import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 rounded-xl w-80">
        <h2 className="text-white text-xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-800 text-white placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300"
        >
          Log In
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