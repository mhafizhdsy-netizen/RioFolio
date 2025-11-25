import { createClient } from '@supabase/supabase-js';

// Hardcoding credentials directly as requested to ensure a successful connection.
const supabaseUrl = 'https://gekofdopgdtzggdqrdui.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdla29mZG9wZ2R0emdnZHFyZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODc2ODAsImV4cCI6MjA3OTY2MzY4MH0.DO0IAzC-yrqmkZyp71ZWLVpvsiG0lgHpOHbkh_Uv0MI';

// Check if the hardcoded values are valid before creating the client.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Key are required but were not provided in the hardcoded client.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);