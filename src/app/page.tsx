"use client";

import { useState, useEffect } from "react";
import VenueCard from "@/components/VenueCard";
import Link from "next/link";
import { Venue } from "@/types/venue";

export default function HomePage() {
  const [venueList, setVenueList] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then((data: Venue[]) => setVenueList(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            100% free for renters
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Rent Basketball Courts
            <br />
            <span className="text-gray-400">in the Bay Area</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            One form sends your request to every matching gym and rec center in SF and the Bay Area. No calling around.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/request"
              className="inline-block bg-gray-900 text-white font-medium px-8 py-3.5 rounded-xl text-base hover:bg-gray-800 transition-colors shadow-sm"
            >
              Request a Basketball Court
            </Link>
            <span className="text-sm text-gray-400">Takes 60 seconds</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Why CourtRenter?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Save hours of calling</h3>
              <p className="text-sm text-gray-500 mt-1">
                Stop Googling and cold-calling gyms. One form reaches every court in the Bay Area.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Compare multiple venues</h3>
              <p className="text-sm text-gray-500 mt-1">
                Venues come to you with availability and pricing. Pick the best fit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Get the best price</h3>
              <p className="text-sm text-gray-500 mt-1">
                When venues compete for your booking, you win. And it costs you nothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Courts in the Bay Area</h2>
          {!loading && (
            <p className="text-sm text-gray-500 text-center mb-8">
              {venueList.length} venues ready to receive your request
            </p>
          )}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
                  <div className="w-full h-40 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-10 bg-gray-200 rounded-lg w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {venueList.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">1</div>
              <h3 className="font-semibold text-gray-900">Tell Us What You Need</h3>
              <p className="text-sm text-gray-500 mt-1">
                Fill out a quick quiz (court type, dates, purpose, and more).
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">2</div>
              <h3 className="font-semibold text-gray-900">Venues Are Notified Instantly</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your request is sent to every matching gym and rec center right away.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">3</div>
              <h3 className="font-semibold text-gray-900">Courts Contact You</h3>
              <p className="text-sm text-gray-500 mt-1">
                Interested places reach out directly with availability and pricing.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/request"
              className="inline-block bg-gray-900 text-white font-medium px-8 py-3.5 rounded-xl text-base hover:bg-gray-800 transition-colors shadow-sm"
            >
              Get Started - It&apos;s Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
