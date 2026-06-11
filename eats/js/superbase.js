const SUPABASE_URL = "https://nrfganvjmifbltvqmeup.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_BBUzKBFNpgl9Wi4ewoFhnA_6wxEbgto";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);