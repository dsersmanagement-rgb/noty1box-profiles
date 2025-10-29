// Load profile from Google Sheet
async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>No ID found.</p>";
    return;
  }

  try {
    // ✅ FIX: Make sure we load full A:F range
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:F?key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const rows = data.values || [];
    if (rows.length < 2) {
      document.getElementById("profile").innerHTML = "<p>No data found.</p>";
      return;
    }

    // ✅ FIX: Trim ID to avoid mismatch
    const user = rows.find(row => row[0] && row[0].trim() === id.trim());

    if (!user) {
      document.getElementById("profile").innerHTML = "<p>ID not found.</p>";
      return;
    }

    const name = user[1] || "Business Name";
    const instagram = user[2] || "";
    const tiktok = user[3] || "";
    const whatsapp = user[4] || "";

    let buttons = "";
    if (instagram) buttons += `<a href="${instagram}" target="_blank">Instagram</a>`;
    if (tiktok) buttons += `<a href="${tiktok}" target="_blank">TikTok</a>`;
    if (whatsapp) buttons += `<a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>`;

    document.getElementById("profile").innerHTML = `
      <h2>${name}</h2>
      ${buttons || "<p>No links available.</p>"}
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("profile").innerHTML = "<p>Error loading profile.</p>";
  }
}

window.onload = loadProfile;
