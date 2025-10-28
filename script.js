async function loadData(type) {
  const content = document.getElementById("content");
  content.innerHTML = "<p>🔄 Memuat data...</p>";

  let url;

  // Ganti dengan URL data kamu
  if (type === "summary") {
    url = "https://raw.githubusercontent.com/DataIT16/snbt2025/main/data/summary.json";
  } else if (type === "ptn") {
    url = "https://raw.githubusercontent.com/DataIT16/snbt2025/main/data/ptn.json";
  } else if (type === "prodi") {
    url = "https://raw.githubusercontent.com/DataIT16/snbt2025/main/data/prodi.json";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    renderTable(data);
  } catch (err) {
    content.innerHTML = `<p style="color:red;">❌ Gagal memuat data: ${err}</p>`;
  }
}

function renderTable(data) {
  const content = document.getElementById("content");
  if (!Array.isArray(data) || data.length === 0) {
    content.innerHTML = "<p>Data kosong.</p>";
    return;
  }

  let html = "<table><thead><tr>";
  Object.keys(data[0]).forEach(key => {
    html += `<th>${key}</th>`;
  });
  html += "</tr></thead><tbody>";

  data.forEach(row => {
    html += "<tr>";
    Object.values(row).forEach(val => {
      html += `<td>${val}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";

  content.innerHTML = html;
}

// Jalankan otomatis saat halaman dibuka
loadData("summary");
