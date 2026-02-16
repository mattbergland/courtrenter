import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { LeadRequest } from "@/types/venue";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest;

    if (
      !body.renterName ||
      !body.renterEmail ||
      !body.renterPhone ||
      !body.sport ||
      !body.courtRequest ||
      !body.courtsNeeded ||
      !Array.isArray(body.dateOptions) ||
      body.dateOptions.length === 0 ||
      !body.preferredTime || typeof body.preferredTime !== "object" ||
      !body.groupSize ||
      !body.ageGroup ||
      !body.purpose
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const lead = createLead(body);

    return NextResponse.json({ id: lead.id, matchedVenues: lead.matchedVenueIds.length });
  } catch {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
