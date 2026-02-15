import { NextResponse } from "next/server";
import { importVenuesFromCSV } from "@/lib/venues-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.csv || typeof body.csv !== "string") {
      return NextResponse.json(
        { error: "CSV text is required in the 'csv' field" },
        { status: 400 }
      );
    }

    const result = importVenuesFromCSV(body.csv);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to import CSV" }, { status: 500 });
  }
}
