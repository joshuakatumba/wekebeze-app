-- Supabase Migration Script for Wekebeze Cancer Awareness
-- Run this in the Supabase SQL Editor

-- 1. Enable PostGIS for screening center location queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Profiles table (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    age INTEGER CHECK (age > 0 AND age < 120),
    language TEXT DEFAULT 'en' CHECK (language IN ('en', 'lg')),
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Screening Centers table
CREATE TABLE IF NOT EXISTS public.screening_centers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    location TEXT NOT NULL,
    coordinates GEOGRAPHY(POINT) NOT NULL, -- PostGIS point for spatial queries
    contact TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.1 Screening Center Services (Many-to-One)
CREATE TABLE IF NOT EXISTS public.center_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    center_id UUID REFERENCES public.screening_centers ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Chat Nodes table
CREATE TABLE IF NOT EXISTS public.chat_nodes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cancer_type TEXT CHECK (cancer_type IN ('breast', 'cervical')),
    language TEXT CHECK (language IN ('en', 'lg')),
    node_id TEXT NOT NULL,
    node_data JSONB NOT NULL, -- Stores type, text, image_url, buttons
    UNIQUE(cancer_type, language, node_id)
);

-- 5. Quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cancer_type TEXT CHECK (cancer_type IN ('breast', 'cervical')),
    question TEXT NOT NULL,
    options TEXT[] NOT NULL,
    answer INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. User Progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    cancer_type TEXT CHECK (cancer_type IN ('breast', 'cervical')),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, cancer_type)
);

-- 6.1 User Quiz Scores
CREATE TABLE IF NOT EXISTS public.user_quiz_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    progress_id UUID REFERENCES public.user_progress ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6.2 User Chat History
CREATE TABLE IF NOT EXISTS public.user_chat_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    progress_id UUID REFERENCES public.user_progress ON DELETE CASCADE,
    node_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Row Level Security (RLS) Policies

-- Profiles: Users can read/write their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Screening Centers: Public read, Admin write
ALTER TABLE public.screening_centers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read centers" ON public.screening_centers FOR SELECT USING (TRUE);
CREATE POLICY "Admin write centers" ON public.screening_centers FOR ALL USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
);

-- Chat Nodes & Quizzes: Public read, Admin write
ALTER TABLE public.chat_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read chat_nodes" ON public.chat_nodes FOR SELECT USING (TRUE);
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read quizzes" ON public.quizzes FOR SELECT USING (TRUE);

-- User Progress: Users can only see/edit their own progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- 8. Functions & Triggers

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Spatial query function for nearby centers
CREATE OR REPLACE FUNCTION get_nearby_centers(user_lat FLOAT, user_lng FLOAT, radius_meters FLOAT DEFAULT 50000)
RETURNS TABLE (
    id UUID,
    name TEXT,
    district TEXT,
    location TEXT,
    dist_meters FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id, c.name, c.district, c.location,
        ST_Distance(c.coordinates, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography) as dist_meters
    FROM screening_centers c
    WHERE ST_DWithin(c.coordinates, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography, radius_meters)
    ORDER BY dist_meters;
END;
$$ LANGUAGE plpgsql STABLE;
