// Load profile from Google Sheet
async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>Configuration réussie !</p> <p>Veuillez fermer cette page puis rescanner votre Noty1Box.</p>";
    return;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const rows = data.values;
    const user = rows.find(row => row[0] === id);

    // ✅ If user does not exist yet → REDIRECT TO TALLY FORM
    if (!user) {
      window.location.href = `https://tally.so/r/nWG99R?id=${id}`;
      return;
    }

    // ✅ If user exists → Show profile
    const name = user[1] || "";
    const instagram = user[2] || "";
    const tiktok = user[3] || "";
    const whatsapp = user[4] || "";

    let buttons = "";
    if (instagram) buttons += `<a href="${instagram}" target="_blank">Instagram</a>`;
    if (tiktok) buttons += `<a href="${tiktok}" target="_blank">TikTok</a>`;
    if (whatsapp) buttons += `<a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>`;

    document.getElementById("profile").innerHTML = `
      <h2>${name}</h2>
      ${buttons || "<p>Aucun lien.</p>"}
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("profile").innerHTML = "<p>Erreur 404</p>";
  }
}

window.onload = loadProfile;
