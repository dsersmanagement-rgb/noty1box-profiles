// Load profile from Google Sheet using OpenSheet (no API key required)
async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>No ID found.</p>";
    return;
  }

  try {
    // ✅ OpenSheet instantly turns your sheet into a public JSON API
    const url = `https://opensheet.elk.sh/18Hul4Us2rd_1jXRhYAHA0KOK2zuWlbFxb0A4-mJHmXg/Sheet1`;
    const response = await fetch(url);
    const rows = await response.json();

    // ✅ Match ID case-insensitively and trim any spaces
    const user = rows.find(row => row.id && row.id.trim().toLowerCase() === id.trim().toLowerCase());

    if (!user) {
      document.getElementById("profile").innerHTML = "<p>ID not found.</p>";
      return;
    }

    // ✅ Extract data safely
    const name = user.name || "Business Name";
    const instagram = user.instagram || "";
    const tiktok = user.tiktok || "";
    const whatsapp = user.whatsapp || "";

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
