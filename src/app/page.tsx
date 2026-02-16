"use client";

import { useState, useEffect } from "react";
import VenueCard from "@/components/VenueCard";
import Link from "next/link";
import { Venue } from "@/types/venue";

export default function HomePage() {
  const [venueList, setVenueList] = useState<Venue[]>([]);

  useEffect(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then((data: Venue[]) => setVenueList(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Rent Basketball Courts
            <br />
            <span className="text-gray-400">in San Francisco</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Find the perfect basketball court for your team, league, or private event.
          </p>
          <div className="mt-8">
            <Link
              href="/request"
              className="inline-block bg-gray-900 text-white font-medium px-8 py-3.5 rounded-xl text-base hover:bg-gray-800 transition-colors shadow-sm"
            >
              Request a Basketball Court
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {venueList.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          {venueList.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              Loading courts...
            </p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">1</div>
              <h3 className="font-semibold text-gray-900">Tell Us What You Need</h3>
              <p className="text-sm text-gray-500 mt-1">
                Fill out a quick quiz (court type, dates, purpose, and more).
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">2</div>
              <h3 className="font-semibold text-gray-900">We Notify Courts</h3>
              <p className="text-sm text-gray-500 mt-1">
                Matching gyms and rec centers in SF are notified about your request.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">3</div>
              <h3 className="font-semibold text-gray-900">Courts Contact You</h3>
              <p className="text-sm text-gray-500 mt-1">
                Interested places reach out directly with availability and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
