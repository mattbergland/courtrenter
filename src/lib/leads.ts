import { Lead, LeadRequest } from "@/types/venue";
import { getVenuesBySport } from "./venues-data";
import { sendRenterConfirmation } from "./email";
import { supabase } from "./supabase";

const useDb = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY));

const leads = new Map<string, Lead>();

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

interface DbLead {
  id: string;
  renter_name: string;
  renter_email: string;
  renter_phone: string;
  sport: string;
  court_request: string;
  courts_needed: number;
  date_options: string[];
  preferred_time: Record<string, string[]>;
  group_size: number;
  age_group: string;
  purpose: string;
  amenities: string[];
  amenities_notes: string;
  message: string;
  venue_id: string | null;
  email_opt_in: boolean;
  created_at: string;
  matched_venue_ids: string[];
  unlocked_by_venue_ids: string[];
}

function toLead(row: DbLead): Lead {
  return {
    id: row.id,
    renterName: row.renter_name,
    renterEmail: row.renter_email,
    renterPhone: row.renter_phone,
    sport: row.sport as Lead["sport"],
    courtRequest: row.court_request as Lead["courtRequest"],
    courtsNeeded: row.courts_needed,
    dateOptions: row.date_options,
    preferredTime: row.preferred_time,
    groupSize: row.group_size,
    ageGroup: row.age_group as Lead["ageGroup"],
    purpose: row.purpose as Lead["purpose"],
    amenities: row.amenities,
    amenitiesNotes: row.amenities_notes,
    message: row.message,
    venueId: row.venue_id,
    emailOptIn: row.email_opt_in,
    createdAt: row.created_at,
    matchedVenueIds: row.matched_venue_ids,
    unlockedByVenueIds: row.unlocked_by_venue_ids,
  };
}

function toDbLead(lead: Lead) {
  return {
    id: lead.id,
    renter_name: lead.renterName,
    renter_email: lead.renterEmail,
    renter_phone: lead.renterPhone,
    sport: lead.sport,
    court_request: lead.courtRequest,
    courts_needed: lead.courtsNeeded,
    date_options: lead.dateOptions,
    preferred_time: lead.preferredTime,
    group_size: lead.groupSize,
    age_group: lead.ageGroup,
    purpose: lead.purpose,
    amenities: lead.amenities,
    amenities_notes: lead.amenitiesNotes,
    message: lead.message,
    venue_id: lead.venueId,
    email_opt_in: lead.emailOptIn,
    created_at: lead.createdAt,
    matched_venue_ids: lead.matchedVenueIds,
    unlocked_by_venue_ids: lead.unlockedByVenueIds,
  };
}

export async function createLead(request: LeadRequest): Promise<Lead> {
  const id = generateId();

  const matchedVenues = request.venueId
    ? [request.venueId]
    : (await getVenuesBySport(request.sport)).map((v) => v.id);

  const lead: Lead = {
    id,
    renterName: request.renterName,
    renterEmail: request.renterEmail,
    renterPhone: request.renterPhone,
    sport: request.sport,
    courtRequest: request.courtRequest,
    courtsNeeded: request.courtsNeeded,
    dateOptions: request.dateOptions,
    preferredTime: request.preferredTime,
    groupSize: request.groupSize,
    ageGroup: request.ageGroup,
    purpose: request.purpose,
    amenities: request.amenities,
    amenitiesNotes: request.amenitiesNotes,
    message: request.message,
    venueId: request.venueId,
    emailOptIn: request.emailOptIn,
    createdAt: new Date().toISOString(),
    matchedVenueIds: matchedVenues,
    unlockedByVenueIds: [],
  };

  if (useDb) {
    const { error } = await supabase.from("leads").insert(toDbLead(lead));
    if (error) console.error("[DB] createLead error:", error);
  }
  leads.set(id, lead);

  console.log(`[LEAD CREATED] ID: ${id}`);

  sendRenterConfirmation({
    to: request.renterEmail,
    renterName: request.renterName,
    courtRequest: request.courtRequest,
    matchedCount: matchedVenues.length,
  });

  if (request.emailOptIn) {
    console.log(`[OPT-IN] ${request.renterEmail} subscribed to new venues & specials`);
  }

  console.log(`[VENUE NOTIFICATIONS] Would send emails to ${matchedVenues.length} venues (pending venue email setup):`);
  matchedVenues.forEach((vid) => {
    console.log(
      `  -> Venue ${vid}: "A renter wants a basketball court (${request.courtRequest}${request.courtRequest === "multiple" ? `, ${request.courtsNeeded} courts` : ""}) on ${request.dateOptions.join(", ")}. Unlock for $2.99: /lead/${id}?venue=${vid}"`
    );
  });

  return lead;
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  if (useDb) {
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).limit(1);
    if (error || !data?.length) return undefined;
    return toLead(data[0] as DbLead);
  }
  return leads.get(id);
}

export async function unlockLead(leadId: string, venueId: string): Promise<boolean> {
  if (useDb) {
    const lead = await getLeadById(leadId);
    if (!lead) return false;
    const unlocked = lead.unlockedByVenueIds.includes(venueId)
      ? lead.unlockedByVenueIds
      : [...lead.unlockedByVenueIds, venueId];
    const { error } = await supabase
      .from("leads")
      .update({ unlocked_by_venue_ids: unlocked })
      .eq("id", leadId);
    if (error) { console.error("[DB] unlockLead error:", error); return false; }
    console.log(`[LEAD UNLOCKED] Lead ${leadId} unlocked by venue ${venueId}`);
    return true;
  }

  const lead = leads.get(leadId);
  if (!lead) return false;
  if (!lead.unlockedByVenueIds.includes(venueId)) {
    lead.unlockedByVenueIds.push(venueId);
  }
  console.log(`[LEAD UNLOCKED] Lead ${leadId} unlocked by venue ${venueId}`);
  return true;
}
