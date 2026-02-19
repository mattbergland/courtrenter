"use client";

import Link from "next/link";
import { Venue } from "@/types/venue";

function VenuePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center">
      <span className="text-3xl font-bold text-gray-300">{initials}</span>
    </div>
  );
}

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {venue.imageUrl ? (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <VenuePlaceholder name={venue.name} />
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">{venue.name}</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1 whitespace-nowrap">
            {venue.indoor ? "Indoor" : "Outdoor"}
          </span>
        </div>

        <p className="text-sm text-gray-500">{venue.neighborhood} &middot; {venue.address}</p>

        <p className="text-sm text-gray-600 line-clamp-2">{venue.description}</p>

        <div className="flex items-center justify-end mt-auto pt-2">
          <span className="text-xs text-gray-400">
            {venue.courtCount} court{venue.courtCount > 1 ? "s" : ""}
          </span>
        </div>

        <Link
          href={`/request?venue=${venue.id}`}
          className="block w-full text-center bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Request to Rent
        </Link>
      </div>
    </div>
  );
}
