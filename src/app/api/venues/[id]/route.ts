import { NextResponse } from "next/server";
import { getVenueById, updateVenue, deleteVenue } from "@/lib/venues-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const venue = await getVenueById(id);
  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }
  return NextResponse.json(venue);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateVenue(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update venue" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteVenue(id);
  if (!deleted) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
