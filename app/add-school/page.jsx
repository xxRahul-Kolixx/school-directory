"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddSchoolPage() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      let imageUrl = "";

      if (data.image && data.image[0]) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        console.log("Uploading file to Cloudinary:", file.name);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const uploadData = await uploadRes.json();
        console.log("Cloudinary response:", uploadData);

        if (uploadData.secure_url) {
          imageUrl = uploadData.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const payload = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imageUrl,
      };

      const res = await fetch("/api/schools/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      router.push("/show-schools");
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">➕ Add School</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4"
        encType="multipart/form-data"
      >
        {/* School Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            School Name*
          </label>
          <input
            {...register("name", { required: "Name required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Address*
          </label>
          <textarea
            {...register("address", { required: "Address required" })}
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            City*
          </label>
          <input
            {...register("city", { required: "City required" })}
            className="w-full border p-2 rounded"
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            State
          </label>
          <input {...register("state")} className="w-full border p-2 rounded" />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Contact
          </label>
          <input
            {...register("contact")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Email*
          </label>
          <input
            {...register("email_id", { required: "Email required" })}
            className="w-full border p-2 rounded"
          />
          {errors.email_id && (
            <p className="text-red-600 text-sm">{errors.email_id.message}</p>
          )}
        </div>

        {/* Image Upload with Controller */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            School Image
          </label>
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelectedFileName(e.target.files[0]?.name || "");
                  field.onChange(e.target.files);
                }}
                className="w-full border p-2 rounded"
              />
            )}
          />
          {selectedFileName && (
            <p className="text-gray-700 mt-1 text-sm">{selectedFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save School"}
        </button>

        {serverError && <p className="text-red-600 mt-2">{serverError}</p>}
      </form>

      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
