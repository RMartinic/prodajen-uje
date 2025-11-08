"use client";
import Image from "next/image";

interface SellerProps {
  location: string;
  image: string;
  description: string;
}

export default function ProductCard({ location, image, description }: SellerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src={image}
        alt={location}
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-green-800">{location}</h2>
        <p className="mt-3 text-gray-700">{description}</p>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          View Product
        </button>
      </div>
    </div>
  );
}
