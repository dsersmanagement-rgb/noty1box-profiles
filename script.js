async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>No ID found.</p>";
    return;
  }

  try {
    const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
    const response = await fetch(url);
    const rows = await response.json();

    console.log("Rows loaded:", rows);

    const clean = s => (s || "").toString().trim().replace(/\s+/g, "");
    const user = rows.find(r => clean(r.id) === clean(id));

    console.log("ID from URL:", clean(id));
    console.log("Row IDs:", rows.map(r => clean(r.id)));
    console.log("Matched user:", user);

    if (!user) {
      document.getElementById("profile").innerHTML = "<p>ID not found.</p>";
      return;
    }

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
