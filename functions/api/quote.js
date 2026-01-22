export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      dot: formData.get("dot") || "",
      status: formData.get("status") || "",
      message: formData.get("message") || "",
    };

    if (!data.name || !data.phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Name and phone are required" }),
        { status: 400, headers }
      );
    }

    const statusLabels = {
      "researching": "Still researching",
      "getting-dot": "Getting DOT now",
      "new-authority": "Just got authority",
      "established": "Established, shopping",
    };

    const emailHtml = `
      <h2>New Quote Request from rmstruckers.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
        ${data.email ? `<tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>` : ""}
        ${data.dot ? `<tr><td style="padding:8px;font-weight:bold;">DOT Number</td><td style="padding:8px;">${escapeHtml(data.dot)}</td></tr>` : ""}
        ${data.status ? `<tr><td style="padding:8px;font-weight:bold;">Status</td><td style="padding:8px;">${statusLabels[data.status] || escapeHtml(data.status)}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(data.message)}</td></tr>` : ""}
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RMS Website <quotes@rmstruckers.com>",
        to: [env.NOTIFY_EMAIL],
        subject: `Quote Request: ${data.name} - ${data.phone}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send notification" }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Quote handler error:", err);
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

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
