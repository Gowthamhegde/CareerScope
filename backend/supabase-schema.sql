-- Create jobs table in Supabase
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  salary_usd INTEGER NOT NULL,
  experience_level VARCHAR(10) NOT NULL CHECK (experience_level IN ('EN', 'MI', 'SE', 'EX')),
  employment_type VARCHAR(10) NOT NULL CHECK (employment_type IN ('FT', 'PT', 'CT', 'FL')),
  company_size VARCHAR(10) NOT NULL CHECK (company_size IN ('S', 'M', 'L')),
  company_location VARCHAR(100) NOT NULL,
  remote_ratio INTEGER NOT NULL CHECK (remote_ratio IN (0, 50, 100)),
  work_year INTEGER NOT NULL,
  employee_residence VARCHAR(100) NOT NULL,
  salary_local INTEGER NOT NULL,
  local_currency VARCHAR(10) NOT NULL,
  skills TEXT[], -- Array of skills
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_title ON jobs(job_title);
CREATE INDEX IF NOT EXISTS idx_jobs_salary ON jobs(salary_usd DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_experience ON jobs(experience_level);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_year ON jobs(work_year);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(company_location);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON jobs
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated insert (for data import)
CREATE POLICY "Allow authenticated insert" ON jobs
  FOR INSERT
  WITH CHECK (true);
