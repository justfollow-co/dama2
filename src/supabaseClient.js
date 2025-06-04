import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azwmxlsfpyrbuyytzkth.supabase.co'; // remplace avec ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6d214bHNmcHlyYnV5eXR6a3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDEwMTEsImV4cCI6MjA2NDYxNzAxMX0.i--PFCffAjJ2zejHsC0vL2d9Z99OxdwaoSn7cS4NfWo';         // remplace avec ta clé

export const supabase = createClient(supabaseUrl, supabaseKey);
