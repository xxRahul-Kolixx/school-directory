"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/schools/list");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📋 Schools Directory
      </h1>

      {schools.length === 0 ? (
        <p className="text-gray-600">No schools found. Please add one.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {schools.map((s) => (
            <div
              key={s.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-gray-500">No image</span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900">{s.name}</h2>
                <p className="text-sm text-gray-700">{s.address}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {s.city}
                  {s.state ? `, ${s.state}` : ""}
                </p>
                <p className="text-sm text-gray-600 mt-1">{s.email_id}</p>
                {s.contact && (
                  <p className="text-sm text-gray-600 mt-1">📞 {s.contact}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
