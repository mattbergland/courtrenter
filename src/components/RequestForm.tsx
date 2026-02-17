"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AgeGroup, CourtRequest, LeadRequest, RentalPurpose, Sport } from "@/types/venue";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPicker({
  selected,
  onToggle,
  max,
}: {
  selected: string[];
  onToggle: (dateStr: string) => void;
  max: number;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function toStr(day: number) {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${viewYear}-${m}-${d}`;
  }

  function isPast(day: number) {
    return new Date(viewYear, viewMonth, day) < today;
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-base font-semibold text-gray-900">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const str = toStr(day);
          const isSel = selected.includes(str);
          const past = isPast(day);
          const atMax = selected.length >= max && !isSel;
          const disabled = past || atMax;
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <button
              key={str}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(str)}
              className={`aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-sm font-medium transition-all cursor-pointer min-h-[40px] sm:min-h-0
                ${isSel ? "bg-gray-900 text-white shadow-sm" : ""}
                ${!isSel && !disabled ? "hover:bg-gray-100 text-gray-800" : ""}
                ${disabled ? "text-gray-300 cursor-not-allowed" : ""}
                ${isToday && !isSel ? "ring-1 ring-gray-300" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.map((d) => {
            const dt = new Date(d + "T00:00:00");
            const label = dt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short",
            });
            return (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {label}
                <button
                  type="button"
                  onClick={() => onToggle(d)}
                  className="hover:bg-gray-700 rounded-full p-0.5 transition-colors cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
  half: "/court-half.webp",
  full: "/court-full.webp",
  multiple: "/court-multiple.webp",
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

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateTimes, setDateTimes] = useState<Record<string, string[]>>({});

  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [purpose, setPurpose] = useState<RentalPurpose | null>(null);

  const [groupSize, setGroupSize] = useState(10);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenitiesNotes, setAmenitiesNotes] = useState("");
  const [message, setMessage] = useState("");

  const [renterName, setRenterName] = useState("");
  const [renterPhone, setRenterPhone] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(true);

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

  const dateOptions = useMemo(() => selectedDates, [selectedDates]);

  function toggleDate(dateStr: string) {
    setSelectedDates((prev) => {
      if (prev.includes(dateStr)) {
        setDateTimes((t) => {
          const next = { ...t };
          delete next[dateStr];
          return next;
        });
        return prev.filter((d) => d !== dateStr);
      }
      setDateTimes((t) => ({ ...t, [dateStr]: [timeSlots[0]] }));
      return [...prev, dateStr];
    });
  }

  function toggleTimeForDate(dateStr: string, time: string) {
    setDateTimes((t) => {
      const current = t[dateStr] || [];
      if (current.includes(time)) {
        const next = current.filter((s) => s !== time);
        return { ...t, [dateStr]: next.length > 0 ? next : [time] };
      }
      return { ...t, [dateStr]: [...current, time] };
    });
  }

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
      preferredTime: dateTimes,
      groupSize,
      ageGroup,
      purpose,
      amenities,
      amenitiesNotes,
      message,
      venueId: venueId || null,
      emailOptIn,
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

      <div className="border border-gray-200 rounded-2xl p-4 sm:p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">What kind of court do you need?</h2>
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
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">What dates could work?</h2>
              <p className="text-sm text-gray-500 mt-1">
                Tap up to 3 dates. More flexibility = more matches.
              </p>
            </div>

            <CalendarPicker selected={selectedDates} onToggle={toggleDate} max={3} />

            {selectedDates.length > 0 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Preferred times for each date <span className="text-gray-400 font-normal">(tap all that work)</span></label>
                {selectedDates.map((d) => {
                  const dt = new Date(d + "T00:00:00");
                  const label = dt.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });
                  const selected = dateTimes[d] || [];
                  return (
                    <div key={d} className="space-y-2">
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {timeSlots.map((slot) => {
                          const shortLabel = slot.replace(/\s*\(.*\)/, "");
                          const isActive = selected.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => toggleTimeForDate(d, slot)}
                              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {shortLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Who is this for?</h2>
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">What&apos;s the purpose?</h2>
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Anything else we should know?</h2>
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Where should venues reach you?</h2>
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

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                Send me updates about new venues, specials, and deals
              </span>
            </label>

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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Review & submit</h2>
              <p className="text-sm text-gray-500 mt-1">Takes about 30 seconds for courts to start seeing it.</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Court</span>
                <span className="text-gray-900 font-medium text-right">
                  {courtRequest === "half" ? "Half Court" : courtRequest === "full" ? "Full Court" : courtRequest === "multiple" ? `Multiple Courts (${Math.max(2, courtsNeeded)})` : ""}
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-gray-500">Dates & Times</span>
                {dateOptions.map((d) => {
                  const dt = new Date(d + "T00:00:00");
                  const lbl = dt.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });
                  const times = dateTimes[d] || [timeSlots[0]];
                  const timeLabels = times.map((t) => t.replace(/\s*\(.*\)/, ""));
                  return (
                    <div key={d} className="flex justify-between gap-4 pl-2">
                      <span className="text-gray-700 text-sm">{lbl}</span>
                      <span className="text-gray-900 font-medium text-right text-sm">
                        {timeLabels.join(", ")}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Group Size</span>
                <span className="text-gray-900 font-medium text-right">{groupSize} people</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Age Group</span>
                <span className="text-gray-900 font-medium text-right capitalize">{ageGroup || ""}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Purpose</span>
                <span className="text-gray-900 font-medium text-right capitalize">{purpose || ""}</span>
              </div>
              {amenities.length > 0 && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Amenities</span>
                  <span className="text-gray-900 font-medium text-right capitalize">{amenities.map((a) => a.replace(/-/g, " ")).join(", ")}</span>
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
          className="flex-1 border border-gray-200 text-gray-700 font-medium py-3.5 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base sm:text-sm"
        >
          Back
        </button>
        {step < 7 && (
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext() || submitting}
            className="flex-1 bg-gray-900 text-white font-medium py-3.5 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base sm:text-sm"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
