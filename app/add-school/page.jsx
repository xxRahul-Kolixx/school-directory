"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchoolPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/schools/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      // success → redirect to show-schools
      router.push("/show-schools");
    } catch (err) {
      console.error(err);
      setServerError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add School</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">School Name*</label>
          <input
            {...register("name", { required: "Name required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Address*</label>
          <textarea
            {...register("address", { required: "Address required" })}
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">City*</label>
          <input
            {...register("city", { required: "City required" })}
            className="w-full border p-2 rounded"
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">State</label>
          <input {...register("state")} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <input
            {...register("contact", {
              pattern: {
                value: /^[0-9+\-\s()]{6,20}$/,
                message: "Invalid phone",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.contact && (
            <p className="text-red-600 text-sm">{errors.contact.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email*</label>
          <input
            {...register("email_id", {
              required: "Email required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email_id && (
            <p className="text-red-600 text-sm">{errors.email_id.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Image URL (optional)</label>
          <input {...register("image")} className="w-full border p-2 rounded" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save School"}
        </button>

        {serverError && <p className="text-red-600 mt-2">{serverError}</p>}
      </form>
    </div>
  );
}
