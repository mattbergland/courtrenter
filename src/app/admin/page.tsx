"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Venue, Sport } from "@/types/venue";
import { sportLabels } from "@/lib/venues-data";

const emptyForm = {
  name: "",
  address: "",
  neighborhood: "",
  sports: ["basketball"] as Sport[],
  description: "",
  priceRange: "",
  phone: "",
  website: "",
  indoor: false,
  courtCount: 1,
};

export default function AdminPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [csvText, setCsvText] = useState("");
  const [importing, setImporting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadVenues = useCallback(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then((data: Venue[]) => setVenues(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

  function showMessage(msg: string, type: "success" | "error" = "success") {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  }


  function startEdit(venue: Venue) {
    setEditingId(venue.id);
    setForm({
      name: venue.name,
      address: venue.address,
      neighborhood: venue.neighborhood,
      sports: ["basketball"],
      description: venue.description,
      priceRange: venue.priceRange,
      phone: venue.phone,
      website: venue.website,
      indoor: venue.indoor,
      courtCount: venue.courtCount,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  async function handleSave() {
    if (!form.name) {
      showMessage("Name is required", "error");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/venues/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, sports: ["basketball"] }),
        });
        if (!res.ok) throw new Error("Failed to update");
        showMessage(`Updated "${form.name}"`);
      } else {
        const res = await fetch("/api/venues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, sports: ["basketball"] }),
        });
        if (!res.ok) throw new Error("Failed to add");
        showMessage(`Added "${form.name}"`);
      }
      cancelEdit();
      loadVenues();
    } catch {
      showMessage("Failed to save venue", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(venue: Venue) {
    if (!confirm(`Delete "${venue.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/venues/${venue.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showMessage(`Deleted "${venue.name}"`);
      loadVenues();
    } catch {
      showMessage("Failed to delete venue", "error");
    }
  }

  async function handleCSVImport() {
    if (!csvText.trim()) {
      showMessage("Paste CSV data or upload a file first", "error");
      return;
    }

    setImporting(true);
    try {
      const res = await fetch("/api/venues/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvText }),
      });
      const result = await res.json();

      if (result.added > 0) {
        showMessage(`Imported ${result.added} venue${result.added > 1 ? "s" : ""}${result.errors?.length ? ` (${result.errors.length} errors)` : ""}`);
        setCsvText("");
        loadVenues();
      } else {
        showMessage(result.errors?.[0] || "No venues could be imported. Check your CSV format.", "error");
      }
    } catch {
      showMessage("Failed to import CSV", "error");
    } finally {
      setImporting(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setCsvText(text);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              &larr; Back to site
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Admin: Manage Venues</h1>
            <p className="text-sm text-gray-500">{venues.length} venues total</p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
              className="bg-gray-900 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              + Add Venue
            </button>
          )}
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${messageType === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="mb-8 border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              {editingId ? "Edit Venue" : "Add New Venue"}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Kezar Pavilion"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
                  <input
                    type="text"
                    value={form.neighborhood}
                    onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                    placeholder="e.g. Haight-Ashbury"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. 755 Stanyan St, San Francisco, CA 94117"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700">
                  Basketball
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the venue..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    placeholder="e.g. $50-100/hr"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(415) 555-1234"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Court Count</label>
                  <input
                    type="number"
                    min={1}
                    value={form.courtCount}
                    onChange={(e) => setForm({ ...form, courtCount: parseInt(e.target.value) || 1 })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.indoor}
                      onChange={(e) => setForm({ ...form, indoor: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Indoor facility</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gray-900 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : editingId ? "Update Venue" : "Add Venue"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 font-medium px-4 py-2.5 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-2">Import from CSV</h2>
          <p className="text-sm text-gray-500 mb-3">
            Upload a CSV file or paste CSV data. Required columns: <code className="bg-gray-100 px-1 rounded">name</code>. Optional: <code className="bg-gray-100 px-1 rounded">sports</code> (if provided, use <code className="bg-gray-100 px-1 rounded">basketball</code>).
            Optional: <code className="bg-gray-100 px-1 rounded">address</code>, <code className="bg-gray-100 px-1 rounded">neighborhood</code>, <code className="bg-gray-100 px-1 rounded">description</code>, <code className="bg-gray-100 px-1 rounded">priceRange</code>, <code className="bg-gray-100 px-1 rounded">phone</code>, <code className="bg-gray-100 px-1 rounded">website</code>, <code className="bg-gray-100 px-1 rounded">indoor</code>, <code className="bg-gray-100 px-1 rounded">courtCount</code>.
          </p>

          <div className="flex gap-3 mb-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer"
            >
              Choose CSV File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            {csvText && (
              <span className="text-sm text-gray-500 self-center">
                {csvText.split("\n").filter((l) => l.trim()).length - 1} data rows detected
              </span>
            )}
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`name,sports,address,neighborhood,priceRange,phone,indoor,courtCount\nMy Venue,basketball,123 Main St,SoMa,$50-100/hr,(415) 555-0000,true,2`}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 mb-3"
          />

          <button
            onClick={handleCSVImport}
            disabled={importing || !csvText.trim()}
            className="bg-gray-900 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm cursor-pointer"
          >
            {importing ? "Importing..." : "Import Venues"}
          </button>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-4">All Venues ({venues.length})</h2>
          <div className="space-y-3">
            {venues.map((venue) => (
              <div key={venue.id} className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {venue.indoor ? "Indoor" : "Outdoor"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{venue.neighborhood} &middot; {venue.address}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {venue.sports.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {sportLabels[s]}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{venue.priceRange} &middot; {venue.courtCount} court{venue.courtCount !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(venue)}
                    className="text-sm text-gray-500 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
