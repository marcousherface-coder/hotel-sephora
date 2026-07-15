// ============================================================
// Sephora Hotel — Connexion Supabase
// Clé "anon/public" : conçue pour être utilisée côté client,
// elle n'autorise que ce que les règles RLS permettent
// (lecture des chambres/équipements, création de réservations).
// ============================================================

const SUPABASE_URL = "https://ifgblmhxxytafbanzwxv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZ2JsbWh4eHl0YWZiYW56d3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjUyMTMsImV4cCI6MjA5OTY0MTIxM30.P_bCtLB6Ta18OG9Cug3bWO9VwKT8aOxBZLjVBIQS5Ds";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -------------------- Chambres --------------------

async function getChambres() {
  const { data, error } = await supabaseClient
    .from("chambres")
    .select("*")
    .order("ordre", { ascending: true });

  if (error) {
    console.error("Erreur chargement chambres :", error);
    return [];
  }
  return data;
}

// -------------------- Équipements --------------------

async function getEquipements() {
  const { data, error } = await supabaseClient
    .from("equipements")
    .select("*")
    .order("ordre", { ascending: true });

  if (error) {
    console.error("Erreur chargement équipements :", error);
    return [];
  }
  return data;
}

// -------------------- Réservations --------------------

async function creerReservation(reservation) {
  const { data, error } = await supabaseClient
    .from("reservations")
    .insert([reservation])
    .select();

  if (error) {
    console.error("Erreur création réservation :", error);
    return { success: false, error };
  }
  return { success: true, data };
}
