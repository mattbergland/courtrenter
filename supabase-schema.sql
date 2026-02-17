-- CourtRenter Database Schema
-- Run this in the Supabase SQL Editor to create tables

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

-- Enable Row Level Security (optional, for public access via anon key)
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to venues
CREATE POLICY "Venues are publicly readable" ON venues FOR SELECT USING (true);

-- Allow authenticated (service key) full access to venues
CREATE POLICY "Service can manage venues" ON venues FOR ALL USING (true);

-- Allow service key full access to leads
CREATE POLICY "Service can manage leads" ON leads FOR ALL USING (true);
