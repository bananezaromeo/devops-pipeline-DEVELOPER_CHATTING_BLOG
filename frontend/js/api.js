const API_URL = "http://localhost:5000/api";

async function request(url, method = "GET", body = null) {
    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        }
    };

    if (body) config.body = JSON.stringify(body);

    const res = await fetch(API_URL + url, config);
    return res.json();
}
