const BASE_URL = "http://127.0.0.1:8000";

// LOGIN (form-data)
export const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });

    return res.json();
};

// GET doctors
export const getDoctors = async (token) => {
    const res = await fetch(`${BASE_URL}/doctors`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};

// GET patients
export const getPatients = async (token) => {
    const res = await fetch(`${BASE_URL}/patients`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};

// CREATE appointment
export const createAppointment = async (data, token) => {
    const res = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};