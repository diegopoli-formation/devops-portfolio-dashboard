-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  project_url VARCHAR(255),
  github_url VARCHAR(255),
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'planned')),
  start_date DATE,
  end_date DATE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('programming', 'devops', 'cloud', 'tools', 'methodologies', 'other')),
  proficiency INTEGER NOT NULL CHECK (proficiency BETWEEN 1 AND 10),
  icon VARCHAR(100),
  color VARCHAR(7),
  is_featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(255),
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_tags ON projects USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills (category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills (is_featured);

-- Create or replace the function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop all existing triggers first
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Drop all triggers that follow our naming convention
    FOR r IN 
        SELECT trigger_name, event_object_table 
        FROM information_schema.triggers 
        WHERE trigger_name LIKE 'update_%_updated_at'
        AND trigger_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I', 
                      r.trigger_name, r.event_object_table);
        RAISE NOTICE 'Dropped trigger % on table %', r.trigger_name, r.event_object_table;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table with updated_at column
DO $$
DECLARE
    t text;
    trigger_name text;
BEGIN
    -- Get all tables with an updated_at column
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
        AND table_name IN ('users', 'projects', 'skills', 'blog_posts') -- Explicitly list tables
    LOOP
        trigger_name := format('update_%s_updated_at', t);
        
        -- Create the trigger with IF NOT EXISTS
        EXECUTE format('CREATE OR REPLACE TRIGGER %I
                      BEFORE UPDATE ON %I
                      FOR EACH ROW
                      WHEN (OLD.* IS DISTINCT FROM NEW.*)
                      EXECUTE FUNCTION update_updated_at_column()',
                      trigger_name, t);
        
        RAISE NOTICE 'Created trigger % on table %', trigger_name, t;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
