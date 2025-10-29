async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>No ID found.</p>";
    return;
  }

  try {
    // ✅ Use OpenSheet instead of Google API
    const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
    const response = await fetch(url);
    const rows = await response.json();

    // ✅ Find profile by ID
    const user = rows.find(row => row.id === id);

    if (!user) {
      document.getElementById("profile").innerHTML = "<p>ID not found.</p>";
      return;
    }

    // ✅ Extract fields
    const name = user.name || "Business Name";
    const instagram = user.instagram || "";
    const tiktok = user.tiktok || "";
    const whatsapp = user.whatsapp || "";

    // ✅ Build buttons safely
    let buttons = "";
    if (instagram) buttons += `<a href="${instagram}" target="_blank">Instagram</a>`;
    if (tiktok) buttons += `<a href="${tiktok}" target="_blank">TikTok</a>`;
    if (whatsapp) buttons += `<a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>`;

    // ✅ Display HTML
    document.getElementById("profile").innerHTML = `
      <h2>${name}</h2>
      <div class="links">${buttons || "<p>No links available.</p>"}</div>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("profile").innerHTML = "<p>Error loading profile.</p>";
  }
}

window.onload = loadProfile;
