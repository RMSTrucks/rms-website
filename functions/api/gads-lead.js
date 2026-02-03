/**
 * Google Ads Landing Page Lead Handler
 *
 * Creates leads in Close CRM with "Potential Customer" status
 * This distinguishes Google Ads leads from FMCSA leads which use "Lead" status
 *
 * Environment variables needed:
 * - CLOSE_API_KEY: Close CRM API key
 */

// Close CRM API
const CLOSE_API_URL = "https://api.close.com/api/v1/lead/";

// Potential Customer status (NOT "Lead" - that's for FMCSA)
const POTENTIAL_CUSTOMER_STATUS = "stat_98Yj27jaadM1bv6a2ENPXbY3i21vvAmm8DEbCvK9Qp6";

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    // Parse form data
    const formData = await request.formData();
    const data = {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      usdot: formData.get("usdot") || "",
      authority_status: formData.get("authority_status") || "",
      message: formData.get("message") || "",
      source: formData.get("_source") || "google-ads",
      landing_page: formData.get("_landing_page") || "unknown",
    };

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return new Response(
        JSON.stringify({ success: false, error: "Name, phone, and email are required" }),
        { status: 400, headers }
      );
    }

    // Check for API key
    if (!env.CLOSE_API_KEY) {
      console.error("CLOSE_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Server configuration error" }),
        { status: 500, headers }
      );
    }

    // Map authority status to readable label
    const authorityStatusLabels = {
      "waiting": "In 20-day waiting period",
      "active": "Authority is active",
      "not_applied": "Haven't applied yet",
    };

    // Build the note content
    const noteLines = [
      "Source: Google Ads Landing Page - New Authority",
      "",
      `Authority Status: ${authorityStatusLabels[data.authority_status] || data.authority_status || "Not specified"}`,
    ];

    if (data.usdot) {
      noteLines.push(`USDOT#: ${data.usdot}`);
    }

    if (data.message) {
      noteLines.push("");
      noteLines.push(`Additional Info: ${data.message}`);
    }

    noteLines.push("");
    noteLines.push(`Submitted: ${new Date().toISOString()}`);

    // Build Close CRM lead data
    const leadData = {
      name: data.name,
      status_id: POTENTIAL_CUSTOMER_STATUS,
      contacts: [{
        name: data.name,
        phones: [{ phone: data.phone, type: "mobile" }],
        emails: [{ email: data.email, type: "office" }],
      }],
    };

    // Create lead in Close CRM
    const createResponse = await fetch(CLOSE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa(env.CLOSE_API_KEY + ":"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("Close API error creating lead:", createResponse.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create lead" }),
        { status: 500, headers }
      );
    }

    const createdLead = await createResponse.json();
    const leadId = createdLead.id;

    // Add note to the lead
    const noteResponse = await fetch("https://api.close.com/api/v1/activity/note/", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa(env.CLOSE_API_KEY + ":"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead_id: leadId,
        note: noteLines.join("\n"),
      }),
    });

    if (!noteResponse.ok) {
      // Note failed but lead was created - log but don't fail
      console.error("Failed to add note to lead:", await noteResponse.text());
    }

    console.log(`Created lead ${leadId} for ${data.name} from Google Ads LP`);

    return new Response(
      JSON.stringify({ success: true, lead_id: leadId }),
      { status: 200, headers }
    );

  } catch (err) {
    console.error("Google Ads lead handler error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
