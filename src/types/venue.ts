export type Sport = "basketball";

export type CourtRequest = "half" | "full" | "multiple";
export type AgeGroup = "kids" | "teens" | "adults";
export type RentalPurpose = "pickup" | "business" | "corporate" | "league" | "training" | "event";

export interface Venue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  sports: Sport[];
  description: string;
  priceRange: string;
  phone: string;
  website: string;
  indoor: boolean;
  courtCount: number;
  imageUrl?: string;
}

export interface Lead {
  id: string;
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  sport: Sport;
  courtRequest: CourtRequest;
  courtsNeeded: number;
  dateOptions: string[];
  preferredTime: Record<string, string>;
  groupSize: number;
  ageGroup: AgeGroup;
  purpose: RentalPurpose;
  amenities: string[];
  amenitiesNotes: string;
  message: string;
  venueId: string | null;
  createdAt: string;
  matchedVenueIds: string[];
  unlockedByVenueIds: string[];
}

export interface LeadRequest {
  renterName: string;
  renterEmail: string;
  renterPhone: string;
  sport: Sport;
  courtRequest: CourtRequest;
  courtsNeeded: number;
  dateOptions: string[];
  preferredTime: Record<string, string>;
  groupSize: number;
  ageGroup: AgeGroup;
  purpose: RentalPurpose;
  amenities: string[];
  amenitiesNotes: string;
  message: string;
  venueId: string | null;
}
