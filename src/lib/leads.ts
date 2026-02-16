import { Lead, LeadRequest } from "@/types/venue";
import { getVenuesBySport } from "./venues-data";
import { sendRenterConfirmation } from "./email";

const leads = new Map<string, Lead>();

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function createLead(request: LeadRequest): Lead {
  const id = generateId();

  const matchedVenues = request.venueId
    ? [request.venueId]
    : getVenuesBySport(request.sport).map((v) => v.id);

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

export function getLeadById(id: string): Lead | undefined {
  return leads.get(id);
}

export function unlockLead(leadId: string, venueId: string): boolean {
  const lead = leads.get(leadId);
  if (!lead) return false;

  if (!lead.unlockedByVenueIds.includes(venueId)) {
    lead.unlockedByVenueIds.push(venueId);
  }

  console.log(`[LEAD UNLOCKED] Lead ${leadId} unlocked by venue ${venueId}`);
  return true;
}

export function isLeadUnlockedByVenue(leadId: string, venueId: string): boolean {
  const lead = leads.get(leadId);
  if (!lead) return false;
  return lead.unlockedByVenueIds.includes(venueId);
}
