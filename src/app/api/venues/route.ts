import { NextResponse } from "next/server";
import { getAllVenues, addVenue } from "@/lib/venues-data";
import { Sport } from "@/types/venue";

export async function GET() {
  const venues = await getAllVenues();
  return NextResponse.json(venues);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.sports || !body.sports.length) {
      return NextResponse.json(
        { error: "Name and at least one sport are required" },
        { status: 400 }
      );
    }

    const venue = await addVenue({
      name: body.name,
      address: body.address || "",
      neighborhood: body.neighborhood || "",
      sports: body.sports as Sport[],
      description: body.description || "",
      priceRange: body.priceRange || "",
      phone: body.phone || "",
      website: body.website || "",
      indoor: body.indoor ?? false,
      courtCount: body.courtCount ?? 1,
    });

    return NextResponse.json(venue, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add venue" }, { status: 500 });
  }
}
