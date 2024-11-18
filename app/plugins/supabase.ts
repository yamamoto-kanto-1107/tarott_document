import { defineNuxtPlugin } from "nuxt/app";
import { createClient } from "@supabase/supabase-js";


export default defineNuxtPlugin(() => {
  const projectUrl = "https://{{Your Project Id}}.supabase.co";
  const anonKey = "{{Your Anon Key}}"
  const supabase = createClient(projectUrl, anonKey);

  return {
    provide: {
      supabase: supabase,
    }
  }
});