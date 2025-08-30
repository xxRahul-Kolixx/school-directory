import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        🏫 School Directory
      </h1>
      <p className="text-gray-600 mb-8">
        Manage schools easily with this simple app
      </p>
      <div className="flex gap-6">
        <Link
          href="/add-school"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add School
        </Link>
        <Link
          href="/show-schools"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          📋 Show Schools
        </Link>
      </div>
    </div>
  );
}
