import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS venues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT DEFAULT '',
  neighborhood TEXT DEFAULT '',
  sports TEXT[] DEFAULT ARRAY['basketball'],
  description TEXT DEFAULT '',
  price_range TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  website TEXT DEFAULT '',
  indoor BOOLEAN DEFAULT false,
  court_count INTEGER DEFAULT 1,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  renter_name TEXT NOT NULL,
  renter_email TEXT NOT NULL,
  renter_phone TEXT NOT NULL,
  sport TEXT DEFAULT 'basketball',
  court_request TEXT NOT NULL,
  courts_needed INTEGER DEFAULT 1,
  date_options JSONB DEFAULT '[]',
  preferred_time JSONB DEFAULT '{}',
  group_size INTEGER DEFAULT 1,
  age_group TEXT DEFAULT '',
  purpose TEXT DEFAULT '',
  amenities JSONB DEFAULT '[]',
  amenities_notes TEXT DEFAULT '',
  message TEXT DEFAULT '',
  venue_id TEXT,
  email_opt_in BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  matched_venue_ids JSONB DEFAULT '[]',
  unlocked_by_venue_ids JSONB DEFAULT '[]'
);
`;

const SEED_VENUES = [
  { id: "kezar-pavilion", name: "Kezar Pavilion", address: "755 Stanyan St, San Francisco, CA 94117", neighborhood: "Haight-Ashbury", sports: ["basketball"], description: "Historic indoor gym in Golden Gate Park with full-size basketball courts. Popular for leagues and pickup games. Available for private rentals.", price_range: "$75-150/hr", phone: "(415) 831-2774", website: "https://sfrecpark.org/facilities/facility/details/Kezar-Pavilion-702", indoor: true, court_count: 2, image_url: "" },
  { id: "mission-rec-center", name: "Mission Recreation Center", address: "2450 Harrison St, San Francisco, CA 94110", neighborhood: "Mission District", sports: ["basketball"], description: "Community rec center with indoor gymnasium. Great for basketball rentals and private events.", price_range: "$50-100/hr", phone: "(415) 695-5012", website: "https://sfrecpark.org/facilities/facility/details/Mission-Recreation-Center-525", indoor: true, court_count: 1, image_url: "" },
  { id: "hamilton-rec-center", name: "Hamilton Recreation Center", address: "1900 Geary Blvd, San Francisco, CA 94115", neighborhood: "Western Addition", sports: ["basketball"], description: "Well-maintained indoor basketball court in the Western Addition. Ideal for team practices, birthday parties, and corporate events.", price_range: "$50-100/hr", phone: "(415) 292-2008", website: "https://sfrecpark.org/facilities/facility/details/Hamilton-Recreation-Center-440", indoor: true, court_count: 1, image_url: "" },
  { id: "potrero-hill-rec", name: "Potrero Hill Recreation Center", address: "801 Arkansas St, San Francisco, CA 94107", neighborhood: "Potrero Hill", sports: ["basketball"], description: "Indoor gym with panoramic city views. Great neighborhood facility for basketball court rentals.", price_range: "$40-80/hr", phone: "(415) 695-5009", website: "https://sfrecpark.org/facilities/facility/details/Potrero-Hill-Recreation-Center-555", indoor: true, court_count: 1, image_url: "" },
  { id: "moscone-rec-center", name: "Moscone Recreation Center", address: "1800 Chestnut St, San Francisco, CA 94123", neighborhood: "Marina", sports: ["basketball"], description: "Popular Marina district facility with indoor basketball courts. Walking distance from Chestnut Street shops.", price_range: "$50-100/hr", phone: "(415) 292-2006", website: "https://sfrecpark.org/facilities/facility/details/Moscone-Recreation-Center-530", indoor: true, court_count: 1, image_url: "" },
  { id: "sunset-rec-center", name: "Sunset Recreation Center", address: "2201 Lawton St, San Francisco, CA 94122", neighborhood: "Sunset", sports: ["basketball"], description: "Spacious indoor gym in the Sunset with basketball courts. Family-friendly facility with ample parking nearby.", price_range: "$40-80/hr", phone: "(415) 753-7098", website: "https://sfrecpark.org/facilities/facility/details/Sunset-Recreation-Center-596", indoor: true, court_count: 1, image_url: "" },
  { id: "glen-park-rec", name: "Glen Park Recreation Center", address: "70 Elk St, San Francisco, CA 94131", neighborhood: "Glen Park", sports: ["basketball"], description: "Neighborhood rec center with indoor basketball court. Quiet area, easy BART access from Glen Park station.", price_range: "$40-80/hr", phone: "(415) 239-4514", website: "https://sfrecpark.org/facilities/facility/details/Glen-Park-Recreation-Center-430", indoor: true, court_count: 1, image_url: "" },
  { id: "joe-lee-rec", name: "Joe Lee Recreation Center", address: "1395 Mendell St, San Francisco, CA 94124", neighborhood: "Bayview-Hunters Point", sports: ["basketball"], description: "Community-focused gym in Bayview with a full-size indoor basketball court. Affordable rates for private rentals and group events.", price_range: "$35-70/hr", phone: "(415) 822-4660", website: "https://sfrecpark.org/facilities/facility/details/Joe-Lee-Recreation-Center-494", indoor: true, court_count: 1, image_url: "" },
  { id: "balboa-pool-gym", name: "Balboa Park Gymnasium", address: "60 San Jose Ave, San Francisco, CA 94110", neighborhood: "Excelsior", sports: ["basketball"], description: "Large indoor gymnasium adjacent to Balboa Park. Multiple courts available for basketball.", price_range: "$50-100/hr", phone: "(415) 337-4705", website: "https://sfrecpark.org/facilities/facility/details/Balboa-Park-395", indoor: true, court_count: 2, image_url: "" },
  { id: "garfield-square", name: "Garfield Square Recreation Center", address: "1197 26th St, San Francisco, CA 94107", neighborhood: "Mission District", sports: ["basketball"], description: "Active community facility with indoor basketball court. Bilingual staff.", price_range: "$40-80/hr", phone: "(415) 695-5006", website: "https://sfrecpark.org/facilities/facility/details/Garfield-Square-427", indoor: true, court_count: 1, image_url: "" },
  { id: "crocker-amazon-fields", name: "Crocker Amazon Playground & Fields", address: "799 Moscow St, San Francisco, CA 94112", neighborhood: "Excelsior", sports: ["basketball"], description: "Large outdoor basketball courts. One of the best outdoor facilities in the city.", price_range: "$50-150/hr", phone: "(415) 337-4704", website: "https://sfrecpark.org/facilities/facility/details/Crocker-Amazon-Playground-411", indoor: false, court_count: 4, image_url: "" },
];

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { password } = await req.json();
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const sb = createClient(url, key);
  const log: string[] = [];

  try {
    const { error: sqlErr } = await sb.rpc("exec_sql", { query: SCHEMA_SQL });
    if (sqlErr) {
      log.push(`RPC exec_sql not available (${sqlErr.message}), tables must be created via SQL Editor`);
    } else {
      log.push("Tables created via exec_sql");
    }
  } catch {
    log.push("exec_sql RPC not available");
  }

  const { data: existingVenues, error: checkErr } = await sb.from("venues").select("id").limit(1);
  if (checkErr) {
    return NextResponse.json({
      error: "Tables not found. Please run the SQL in supabase-schema.sql via the Supabase SQL Editor first.",
      details: checkErr.message,
      log,
    }, { status: 500 });
  }

  const { count } = await sb.from("venues").select("*", { count: "exact", head: true });
  log.push(`Current venue count: ${count}`);

  if (!count || count === 0) {
    const { error: seedErr } = await sb.from("venues").insert(SEED_VENUES);
    if (seedErr) {
      log.push(`Seed error: ${seedErr.message}`);
    } else {
      log.push(`Seeded ${SEED_VENUES.length} venues`);
    }
  } else {
    log.push("Venues already seeded, skipping");
  }

  const { count: finalCount } = await sb.from("venues").select("*", { count: "exact", head: true });
  log.push(`Final venue count: ${finalCount}`);

  return NextResponse.json({ success: true, log });
}
