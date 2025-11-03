// Load profile from Google Sheet
async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("profile").innerHTML = "<p>Configuration réussie !</p> <br> <p>Veuillez fermer cette page puis rescanner votre Noty1Box.</p>";
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

    // ✅ Extract values from sheet
    const name = user[1] || "";
    const instagram = user[2] || "";
    const tiktok = user[3] || "";
    const whatsapp = user[4] || "";
    const facebook = user[5] || "";
    const youtube = user[6] || "";
    const linkedin = user[7] || "";
    const snapchat = user[8] || "";
    const google = user[9] || "";
    const tripadvisor = user[10] || "";
    const trustpilot = user[11] || "";
    const website = user[12] || "";

    // ✅ Button builder
    let buttons = "";

    function addBtn(url, label, color, textColor = "#fff") {
      if (!url) return;
      buttons += `<a class="social-btn" href="${url}" target="_blank" style="background:${color};color:${textColor};">${label}</a>`;
    }

    addBtn(instagram, "Instagram", "#E4405F");
    addBtn(tiktok, "TikTok", "#000000");
    addBtn(whatsapp, "WhatsApp", "#25D366");
    addBtn(facebook, "Facebook", "#1877F2");
    addBtn(youtube, "YouTube", "#FF0000");
    addBtn(linkedin, "LinkedIn", "#0A66C2");
    addBtn(snapchat, "Snapchat", "#FFFC00", "#000");
    addBtn(google, "Google", "#4285F4");
    addBtn(tripadvisor, "Tripadvisor", "#00A680");
    addBtn(trustpilot, "Trustpilot", "#00B67A");
    addBtn(website, "Site Web", "#333");

    // ✅ Render profile
    document.getElementById("profile").innerHTML = `
      <h1>${name}</h1>
      ${buttons || "<p>Aucun lien.</p>"}
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("profile").innerHTML = "<p>Erreur 404</p>";
  }
}

window.onload = loadProfile;
