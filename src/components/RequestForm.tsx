"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AgeGroup, CourtRequest, LeadRequest, RentalPurpose, Sport } from "@/types/venue";

const timeSlots = [
  "Morning (6am-12pm)",
  "Afternoon (12pm-5pm)",
  "Evening (5pm-9pm)",
  "Late Night (9pm-12am)",
];

const ageGroupOptions: { value: AgeGroup; label: string; helper: string }[] = [
  { value: "kids", label: "Kids", helper: "Typically under 13" },
  { value: "teens", label: "Teens", helper: "13-17" },
  { value: "adults", label: "Adults", helper: "18+" },
];

const purposeOptions: { value: RentalPurpose; label: string; helper: string }[] = [
  { value: "pickup", label: "Pickup", helper: "Casual run / open gym" },
  { value: "league", label: "League", helper: "Games on a schedule" },
  { value: "training", label: "Training", helper: "Practice / coaching" },
  { value: "business", label: "Your business", helper: "You run programs" },
  { value: "corporate", label: "Corporate", helper: "Team event" },
  { value: "event", label: "Event", helper: "Birthday / filming" },
];

const amenityOptions = [
  { value: "lights", label: "Good lighting" },
  { value: "parking", label: "Parking" },
  { value: "locker-rooms", label: "Locker rooms" },
  { value: "showers", label: "Showers" },
  { value: "bleachers", label: "Bleachers / seating" },
  { value: "sound", label: "Sound system" },
  { value: "scoreboard", label: "Scoreboard" },
];

const courtImages: Record<CourtRequest, string> = {
  half: "/court-half.png",
  full: "/court-full.png",
  multiple: "/court-multiple.png",
};

function CourtDiagram({ type }: { type: CourtRequest }) {
  return (
    <img
      src={courtImages[type]}
      alt={`${type} court diagram`}
      className="w-full h-28 object-contain"
    />
  );
}

function OptionCard({
  selected,
  title,
  subtitle,
  diagram,
  onClick,
}: {
  selected: boolean;
  title: string;
  subtitle: string;
  diagram?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border rounded-xl p-4 transition-all cursor-pointer hover:shadow-sm ${
        selected ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-400"
      }`}
    >
      {diagram && <div className="mb-3">{diagram}</div>}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div>
        </div>
        <div
          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
            selected ? "border-gray-900 bg-gray-900" : "border-gray-300"
          }`}
        >
          {selected ? <div className="h-2 w-2 rounded-full bg-white" /> : null}
        </div>
      </div>
    </button>
  );
}

export default function RequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const venueId = searchParams.get("venue");

  const sport: Sport = "basketball";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [courtRequest, setCourtRequest] = useState<CourtRequest | null>(null);
  const [courtsNeeded, setCourtsNeeded] = useState(2);

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [preferredTime, setPreferredTime] = useState(timeSlots[0]);

  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [purpose, setPurpose] = useState<RentalPurpose | null>(null);

  const [groupSize, setGroupSize] = useState(10);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenitiesNotes, setAmenitiesNotes] = useState("");
  const [message, setMessage] = useState("");

  const [renterName, setRenterName] = useState("");
  const [renterPhone, setRenterPhone] = useState("");
  const [renterEmail, setRenterEmail] = useState("");

  const [venueCount, setVenueCount] = useState(0);

  const fetchVenueCount = useCallback(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then((data: unknown[]) => setVenueCount(data.length))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchVenueCount();
  }, [fetchVenueCount]);

  const dateOptions = useMemo(
    () => [date1, date2, date3].map((d) => d.trim()).filter(Boolean),
    [date1, date2, date3]
  );

  function canGoNext(): boolean {
    if (step === 0) return courtRequest !== null;
    if (step === 1) return dateOptions.length > 0;
    if (step === 2) return ageGroup !== null;
    if (step === 3) return purpose !== null;
    if (step === 4) return groupSize > 0;
    if (step === 5) return true;
    if (step === 6) return !!renterName && !!renterPhone && !!renterEmail;
    return true;
  }

  function next() {
    setStep((s) => Math.min(s + 1, 7));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleAmenity(value: string) {
    setAmenities((prev) => (prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]));
  }

  async function handleSubmit() {
    if (!courtRequest || !ageGroup || !purpose) return;

    const payload: LeadRequest = {
      renterName,
      renterEmail,
      renterPhone,
      sport,
      courtRequest,
      courtsNeeded: courtRequest === "multiple" ? Math.max(2, courtsNeeded) : 1,
      dateOptions,
      preferredTime,
      groupSize,
      ageGroup,
      purpose,
      amenities,
      amenitiesNotes,
      message,
      venueId: venueId || null,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      router.push(`/success?id=${data.id}`);
    } catch {
      setSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  }

  const totalSteps = 8;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="space-y-6">
      <div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>Fast basketball court request</span>
          <span>{step + 1}/{totalSteps}</span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What kind of court do you need?</h2>
              <p className="text-sm text-gray-500 mt-1">
                Pick one — we&apos;ll match you to the right gyms and rec centers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <OptionCard
                selected={courtRequest === "half"}
                title="Half court"
                subtitle="Great for training or small groups"
                diagram={<CourtDiagram type="half" />}
                onClick={() => {
                  setCourtRequest("half");
                  setTimeout(next, 150);
                }}
              />
              <OptionCard
                selected={courtRequest === "full"}
                title="Full court"
                subtitle="Best for pickup and games"
                diagram={<CourtDiagram type="full" />}
                onClick={() => {
                  setCourtRequest("full");
                  setTimeout(next, 150);
                }}
              />
              <OptionCard
                selected={courtRequest === "multiple"}
                title="Multiple courts"
                subtitle="Tournaments, big groups, corporate events"
                diagram={<CourtDiagram type="multiple" />}
                onClick={() => setCourtRequest("multiple")}
              />
            </div>

            {courtRequest === "multiple" && (
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">How many courts?</label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={courtsNeeded}
                  onChange={(e) => setCourtsNeeded(parseInt(e.target.value) || 2)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What dates could work?</h2>
              <p className="text-sm text-gray-500 mt-1">Add up to 3 options. More flexibility = more matches.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Option 1 *</label>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Option 2</label>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Option 3</label>
                <input
                  type="date"
                  value={date3}
                  onChange={(e) => setDate3(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred time</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Who is this for?</h2>
              <p className="text-sm text-gray-500 mt-1">Helps match you to the right type of facility.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {ageGroupOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={ageGroup === opt.value}
                  title={opt.label}
                  subtitle={opt.helper}
                  onClick={() => {
                    setAgeGroup(opt.value);
                    setTimeout(next, 150);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What&apos;s the purpose?</h2>
              <p className="text-sm text-gray-500 mt-1">So venues can quote you correctly.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {purposeOptions.map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={purpose === opt.value}
                  title={opt.label}
                  subtitle={opt.helper}
                  onClick={() => {
                    setPurpose(opt.value);
                    setTimeout(next, 150);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Anything else we should know?</h2>
              <p className="text-sm text-gray-500 mt-1">Optional, but it helps venues respond faster.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group size</label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={groupSize}
                  onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities notes</label>
                <input
                  type="text"
                  value={amenitiesNotes}
                  onChange={(e) => setAmenitiesNotes(e.target.value)}
                  placeholder="e.g. need bleachers, scoreboard"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (tap to select)</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleAmenity(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      amenities.includes(opt.value)
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="e.g. must be indoors, need staff on-site, budget range..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {venueCount > 0 ? `${venueCount} venues match your request` : "Venues match your request"}
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Just add your contact info and your request will be sent to all of them instantly. Completely free.
              </p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Where should venues reach you?</h2>
              <p className="text-sm text-gray-500 mt-1">
                Almost done! Just need your contact info so venues can get back to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your name *</label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
                <input
                  type="tel"
                  value={renterPhone}
                  onChange={(e) => setRenterPhone(e.target.value)}
                  placeholder="(415) 555-1234"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input
                type="email"
                value={renterEmail}
                onChange={(e) => setRenterEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <p className="text-xs text-gray-500">
                Your info is only shared with venues that match your request. We never sell your data or send spam.
              </p>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Review & submit</h2>
              <p className="text-sm text-gray-500 mt-1">Takes about 30 seconds for courts to start seeing it.</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Court</span>
                <span className="text-gray-900 font-medium text-right">
                  {courtRequest
                    ? `${courtRequest}${courtRequest === "multiple" ? ` (${Math.max(2, courtsNeeded)})` : ""}`
                    : ""}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Dates</span>
                <span className="text-gray-900 font-medium text-right">{dateOptions.join(", ")}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Time</span>
                <span className="text-gray-900 font-medium text-right">{preferredTime}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Group size</span>
                <span className="text-gray-900 font-medium text-right">{groupSize}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Age</span>
                <span className="text-gray-900 font-medium text-right">{ageGroup || ""}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Purpose</span>
                <span className="text-gray-900 font-medium text-right">{purpose || ""}</span>
              </div>
              {amenities.length > 0 && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Amenities</span>
                  <span className="text-gray-900 font-medium text-right">{amenities.join(", ")}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? "Submitting..." : "Submit request"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Your request will be shared with basketball courts in San Francisco.
              Venues pay a small fee to access your contact info and will reach out to you directly.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || submitting}
          className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Back
        </button>
        {step < 7 && (
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext() || submitting}
            className="flex-1 bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
