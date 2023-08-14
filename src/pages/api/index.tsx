const BASE_URL = 'https://anisoft.us/gapshupapp/api';

export async function validateUser(username, deviceId) {
    const response = await fetch(`${BASE_URL}/user/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Username: username,
            DeviceId: deviceId,
            isTrusted: null,
        }),
    });

    const data = await response.json();
    localStorage.setItem("user-data", JSON.stringify(data))
    return data;
}
export async function verifyUser(username, deviceId, verificationCode) {
    const response = await fetch(`${BASE_URL}/user/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Username: username,
            DeviceId: deviceId,
            "Code": verificationCode,
        }),

    });
    const data = await response.json();
    localStorage.setItem("user-data", JSON.stringify(data))
    return data;
}

export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/user/chatuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Email: userData.email,
            DeviceId: userData.deviceId,
            DisplayName: userData.displayName,
            PhoneNumber: userData.phoneNumber,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    const data = await response.json();
    // localStorage.setItem("user-data", JSON.stringify(data))
    return data;
}



export async function getDashboardData() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  
  if (!userInfo || !userInfo.token) {
    throw new Error('User info or token not found');
  }

  const response = await fetch(`${BASE_URL}/group/dashboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userInfo.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const data = await response.json();
  return data;
}

// Other API functions...









