import { Venue, Sport } from "@/types/venue";

const VALID_SPORTS: Sport[] = ["basketball", "soccer", "tennis", "volleyball", "pickleball"];

const seedVenues: Venue[] = [
  {
    id: "kezar-pavilion",
    name: "Kezar Pavilion",
    address: "755 Stanyan St, San Francisco, CA 94117",
    neighborhood: "Haight-Ashbury",
    sports: ["basketball", "volleyball"],
    description: "Historic indoor gym in Golden Gate Park with full-size basketball courts. Popular for leagues and pickup games. Available for private rentals.",
    priceRange: "$75-150/hr",
    phone: "(415) 831-2774",
    website: "https://sfrecpark.org/facilities/facility/details/Kezar-Pavilion-702",
    indoor: true,
    courtCount: 2,
  },
  {
    id: "mission-rec-center",
    name: "Mission Recreation Center",
    address: "2450 Harrison St, San Francisco, CA 94110",
    neighborhood: "Mission District",
    sports: ["basketball", "volleyball"],
    description: "Community rec center with indoor gymnasium. Great for basketball rentals, volleyball leagues, and private events.",
    priceRange: "$50-100/hr",
    phone: "(415) 695-5012",
    website: "https://sfrecpark.org/facilities/facility/details/Mission-Recreation-Center-525",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "hamilton-rec-center",
    name: "Hamilton Recreation Center",
    address: "1900 Geary Blvd, San Francisco, CA 94115",
    neighborhood: "Western Addition",
    sports: ["basketball"],
    description: "Well-maintained indoor basketball court in the Western Addition. Ideal for team practices, birthday parties, and corporate events.",
    priceRange: "$50-100/hr",
    phone: "(415) 292-2008",
    website: "https://sfrecpark.org/facilities/facility/details/Hamilton-Recreation-Center-440",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "potrero-hill-rec",
    name: "Potrero Hill Recreation Center",
    address: "801 Arkansas St, San Francisco, CA 94107",
    neighborhood: "Potrero Hill",
    sports: ["basketball", "tennis"],
    description: "Indoor gym and outdoor tennis courts with panoramic city views. Great neighborhood facility for court rentals.",
    priceRange: "$40-80/hr",
    phone: "(415) 695-5009",
    website: "https://sfrecpark.org/facilities/facility/details/Potrero-Hill-Recreation-Center-555",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "moscone-rec-center",
    name: "Moscone Recreation Center",
    address: "1800 Chestnut St, San Francisco, CA 94123",
    neighborhood: "Marina",
    sports: ["basketball", "tennis"],
    description: "Popular Marina district facility with indoor basketball and outdoor tennis courts. Walking distance from Chestnut Street shops.",
    priceRange: "$50-100/hr",
    phone: "(415) 292-2006",
    website: "https://sfrecpark.org/facilities/facility/details/Moscone-Recreation-Center-530",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "sunset-rec-center",
    name: "Sunset Recreation Center",
    address: "2201 Lawton St, San Francisco, CA 94122",
    neighborhood: "Sunset",
    sports: ["basketball", "volleyball"],
    description: "Spacious indoor gym in the Sunset with basketball and volleyball courts. Family-friendly facility with ample parking nearby.",
    priceRange: "$40-80/hr",
    phone: "(415) 753-7098",
    website: "https://sfrecpark.org/facilities/facility/details/Sunset-Recreation-Center-596",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "glen-park-rec",
    name: "Glen Park Recreation Center",
    address: "70 Elk St, San Francisco, CA 94131",
    neighborhood: "Glen Park",
    sports: ["basketball", "tennis"],
    description: "Neighborhood rec center with indoor basketball court and outdoor tennis. Quiet area, easy BART access from Glen Park station.",
    priceRange: "$40-80/hr",
    phone: "(415) 239-4514",
    website: "https://sfrecpark.org/facilities/facility/details/Glen-Park-Recreation-Center-430",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "joe-lee-rec",
    name: "Joe Lee Recreation Center",
    address: "1395 Mendell St, San Francisco, CA 94124",
    neighborhood: "Bayview-Hunters Point",
    sports: ["basketball"],
    description: "Community-focused gym in Bayview with a full-size indoor basketball court. Affordable rates for private rentals and group events.",
    priceRange: "$35-70/hr",
    phone: "(415) 822-4660",
    website: "https://sfrecpark.org/facilities/facility/details/Joe-Lee-Recreation-Center-494",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "balboa-pool-gym",
    name: "Balboa Park Gymnasium",
    address: "60 San Jose Ave, San Francisco, CA 94110",
    neighborhood: "Excelsior",
    sports: ["basketball", "volleyball", "pickleball"],
    description: "Large indoor gymnasium adjacent to Balboa Park. Multiple courts available for basketball, volleyball, and the new pickleball program.",
    priceRange: "$50-100/hr",
    phone: "(415) 337-4705",
    website: "https://sfrecpark.org/facilities/facility/details/Balboa-Park-395",
    indoor: true,
    courtCount: 2,
  },
  {
    id: "golden-gate-park-tennis",
    name: "Golden Gate Park Tennis Center",
    address: "790 John F Kennedy Dr, San Francisco, CA 94118",
    neighborhood: "Golden Gate Park",
    sports: ["tennis", "pickleball"],
    description: "21 outdoor courts in the heart of Golden Gate Park, including dedicated pickleball courts. The premier public tennis facility in SF.",
    priceRange: "$10-20/hr per court",
    phone: "(415) 831-2700",
    website: "https://sfrecpark.org/facilities/facility/details/Golden-Gate-Park-Tennis-Center-433",
    indoor: false,
    courtCount: 21,
  },
  {
    id: "garfield-square",
    name: "Garfield Square Recreation Center",
    address: "1197 26th St, San Francisco, CA 94107",
    neighborhood: "Mission District",
    sports: ["basketball", "soccer"],
    description: "Active community facility with indoor basketball and adjacent soccer-friendly outdoor field. Bilingual staff.",
    priceRange: "$40-80/hr",
    phone: "(415) 695-5006",
    website: "https://sfrecpark.org/facilities/facility/details/Garfield-Square-427",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "crocker-amazon-fields",
    name: "Crocker Amazon Playground & Fields",
    address: "799 Moscow St, San Francisco, CA 94112",
    neighborhood: "Excelsior",
    sports: ["soccer", "basketball"],
    description: "Large outdoor soccer fields and basketball courts. One of the best outdoor facilities in the city for field sports.",
    priceRange: "$50-150/hr",
    phone: "(415) 337-4704",
    website: "https://sfrecpark.org/facilities/facility/details/Crocker-Amazon-Playground-411",
    indoor: false,
    courtCount: 4,
  },
  {
    id: "beach-chalet-fields",
    name: "Beach Chalet Athletic Fields",
    address: "1360 John F Kennedy Dr, San Francisco, CA 94121",
    neighborhood: "Outer Richmond",
    sports: ["soccer"],
    description: "Premium synthetic turf soccer fields on the western edge of Golden Gate Park. Lighted for evening play. Popular for adult leagues.",
    priceRange: "$100-200/hr",
    phone: "(415) 831-2700",
    website: "https://sfrecpark.org/facilities/facility/details/Beach-Chalet-Athletic-Fields-397",
    indoor: false,
    courtCount: 3,
  },
  {
    id: "bay-club-sf",
    name: "Bay Club SF Tennis",
    address: "150 Folsom St, San Francisco, CA 94105",
    neighborhood: "SoMa",
    sports: ["tennis", "pickleball"],
    description: "Premium private club with indoor tennis and pickleball courts in SoMa. Guest passes available for court rentals. Top-tier facilities.",
    priceRange: "$80-150/hr",
    phone: "(415) 495-2500",
    website: "https://www.bayclubs.com/sf-tennis",
    indoor: true,
    courtCount: 4,
  },
];

const venueStore = new Map<string, Venue>();
seedVenues.forEach((v) => venueStore.set(v.id, v));

export function getAllVenues(): Venue[] {
  return Array.from(venueStore.values());
}

export const venues = getAllVenues();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function addVenue(data: Omit<Venue, "id"> & { id?: string }): Venue {
  const id = data.id || slugify(data.name);
  const venue: Venue = { ...data, id };
  venueStore.set(id, venue);
  return venue;
}

export function updateVenue(id: string, data: Partial<Omit<Venue, "id">>): Venue | null {
  const existing = venueStore.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data };
  venueStore.set(id, updated);
  return updated;
}

export function deleteVenue(id: string): boolean {
  return venueStore.delete(id);
}

export function parseVenueCSV(csvText: string): Venue[] {
  const lines = csvText.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const results: Venue[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx]?.trim() || "";
    });

    const name = row["name"] || "";
    if (!name) continue;

    const sportsRaw = (row["sports"] || "").split(";").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const sports = sportsRaw.filter((s) => VALID_SPORTS.includes(s as Sport)) as Sport[];
    if (sports.length === 0) continue;

    const venue: Venue = {
      id: row["id"] || slugify(name),
      name,
      address: row["address"] || "",
      neighborhood: row["neighborhood"] || "",
      sports,
      description: row["description"] || "",
      priceRange: row["pricerange"] || row["price_range"] || row["price range"] || "",
      phone: row["phone"] || "",
      website: row["website"] || "",
      indoor: ["true", "yes", "1", "indoor"].includes((row["indoor"] || "false").toLowerCase()),
      courtCount: parseInt(row["courtcount"] || row["court_count"] || row["courts"] || "1", 10) || 1,
    };

    results.push(venue);
  }

  return results;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function importVenuesFromCSV(csvText: string): { added: number; errors: string[] } {
  const parsed = parseVenueCSV(csvText);
  const errors: string[] = [];
  let added = 0;

  parsed.forEach((venue, idx) => {
    try {
      addVenue(venue);
      added++;
    } catch {
      errors.push(`Row ${idx + 2}: Failed to import "${venue.name}"`);
    }
  });

  return { added, errors };
}

export const sportLabels: Record<string, string> = {
  basketball: "Basketball",
  soccer: "Soccer",
  tennis: "Tennis",
  volleyball: "Volleyball",
  pickleball: "Pickleball",
};

export const sportEmoji: Record<string, string> = {
  basketball: "\uD83C\uDFC0",
  soccer: "\u26BD",
  tennis: "\uD83C\uDFBE",
  volleyball: "\uD83C\uDFD0",
  pickleball: "\uD83C\uDFD3",
};

export function getVenueById(id: string): Venue | undefined {
  return venueStore.get(id);
}

export function getVenuesBySport(sport: string): Venue[] {
  const all = getAllVenues();
  if (sport === "all") return all;
  return all.filter((v) => v.sports.includes(sport as Sport));
}
