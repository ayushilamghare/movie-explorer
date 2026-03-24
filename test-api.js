

const TMDB_TOKEN = "your_valid_token_here"; // From .env
const TMDB_HEADERS = { Authorization: `Bearer ${TMDB_TOKEN}` };

async function test() {
    const path = "/search/movie?query=Inception&page=1";
    const url = `https://api.themoviedb.org/3${path}`;
    console.log(`Fetching: ${url}`);
    try {
        const res = await fetch(url, { headers: TMDB_HEADERS });
        console.log(`Status: ${res.status} ${res.statusText}`);
        const data = await res.json();
        console.log("Data:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
}

test();
