import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      name,
      email,
      whatsapp,
      project_type,
      deadline,
      budget,
      message,
    } = body.message?.toolCalls?.[0]?.function?.arguments ?? body;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase.from("ai_leads").insert({
      client_name: name || null,
      email: email || null,
      whatsapp: whatsapp || null,
      project_type: project_type || null,
      deadline: deadline || null,
      budget: budget || null,
      message: message || null,
      source: "voice_assistant",
      read: false,
    }).select().single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Lead saved:", data);

    return new Response(
      JSON.stringify({
        results: [
          {
            toolCallId: body.message?.toolCalls?.[0]?.id ?? "direct",
            result: "Lead saved successfully. I've noted down all the details and Piyush will get back to you soon!",
          },
        ],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Function error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
