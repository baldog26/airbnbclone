// Generated from the Supabase schema (trimmed to the tables this app uses).
// Regenerate with: npx supabase gen types typescript --project-id <ref>
export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.18" };
  public: {
    Tables: {
      favorites: {
        Row: { created_at: string; listing_id: string; user_id: string };
        Insert: { created_at?: string; listing_id: string; user_id: string };
        Update: { created_at?: string; listing_id?: string; user_id?: string };
        Relationships: [
          {
            foreignKeyName: "favorites_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "listings";
            referencedColumns: ["id"];
          },
        ];
      };
      listings: {
        Row: {
          amenities: string[];
          baths: number;
          bedrooms: number;
          beds: number;
          city: string;
          country: string;
          created_at: string;
          description: string;
          guests: number;
          host_name: string;
          id: string;
          images: string[];
          lat: number | null;
          lng: number | null;
          price_per_night: number;
          property_type: string;
          region: string | null;
          slug: string;
          summary: string;
          title: string;
        };
        Insert: Partial<Database["public"]["Tables"]["listings"]["Row"]> & {
          baths: number; bedrooms: number; beds: number; city: string; country: string;
          description: string; guests: number; host_name: string; price_per_night: number;
          property_type: string; slug: string; summary: string; title: string;
        };
        Update: Partial<Database["public"]["Tables"]["listings"]["Row"]>;
        Relationships: [];
      };
      profiles: {
        Row: { avatar_url: string | null; created_at: string; full_name: string | null; id: string };
        Insert: { avatar_url?: string | null; created_at?: string; full_name?: string | null; id: string };
        Update: { avatar_url?: string | null; created_at?: string; full_name?: string | null; id?: string };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Listing = Database["public"]["Tables"]["listings"]["Row"];
