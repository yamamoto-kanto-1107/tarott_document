import { defineNuxtPlugin } from "nuxt/app";
import { createClient } from "@supabase/supabase-js";


export default defineNuxtPlugin(() => {
  const projectUrl = "https://yifkzbokltbjllppeeba.supabase.co";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZmt6Ym9rbHRiamxscHBlZWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzkyNzMsImV4cCI6MjA3MDU1NTI3M30.3hbpUxnSWD9UK5r7rApWPIjsKDlXnve6XqskoUnvDfk"
  const supabase = createClient(projectUrl, anonKey);

  return {
    provide: {
      supabase: supabase,
    }
  }
});