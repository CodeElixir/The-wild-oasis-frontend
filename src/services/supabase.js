import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dbhnhgdbpyuzfnqcshij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiaG5oZ2RicHl1emZucWNzaGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5MjkzNDcsImV4cCI6MjAwNzUwNTM0N30.7CngVu48ZPctUBmYmRbSG5hA_S3UnsLuOYjmy1XXedE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
