async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const date = document.getElementById('dateInput').value;

    if (!city || !date) {
        alert("Mohon isi nama kota dan pilih tanggal.");
        return;
    }

    // Langkah 1: Cari koordinat kota dari Open-Meteo Geocoding API
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoResp = await fetch(geoUrl);
    const geoData = await geoResp.json();

    if (!geoData.results || geoData.results.length === 0) {
        alert("Kota tidak ditemukan.");
        return;
    }

    const location = geoData.results[0];
    const lat = location.latitude;
    const lon = location.longitude;

    // Langkah 2: Ambil data cuaca harian (histori + prakiraan)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto&start_date=${date}&end_date=${date}`;
    const weatherResp = await fetch(weatherUrl);
    const weatherData = await weatherResp.json();

    const daily = weatherData.daily;
    if (!daily || daily.time.length === 0) {
        alert("Data cuaca tidak tersedia untuk tanggal tersebut.");
        return;
    }

    // Langkah 3: Tampilkan hasil
    document.getElementById('weatherResult').innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p>Tanggal: ${daily.time[0]}</p>
        <p>Temperatur Maks: ${daily.temperature_2m_max[0]}°C</p>
        <p>Temperatur Min: ${daily.temperature_2m_min[0]}°C</p>
        <p>Curah Hujan: ${daily.precipitation_sum[0]} mm</p>
    `;
}
