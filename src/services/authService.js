const API_URL = 'http://localhost:3001/user'; // Replace with your API URL

/**
 * Fetches data from the API.
 * @returns {Promise<Object>} The data fetched from the API.
 * @throws {Error} If the network response is not ok.
 */
export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * Logs in a user with the provided credentials.
 * @param {Object} credentials - The user's login credentials.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
export const login = async (credentials) => {
  try {
    console.log(credentials);
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

/**
 * Verifies the provided PIN.
 * @param {Object} credentials - The PIN verification credentials.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
export const verifyPin = async (credentials) => {
  try {
    console.log(credentials);
    const response = await fetch(`${API_URL}/verify_pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error verifying pin:", error);
    throw error;
  }
}

/**
 * Registers a new user with the provided data.
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
export const register = async (userData) => {
  console.log(userData);
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

/**
 * Fetches user information using a provided token.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<Object>} The user information.
 * @throws {Error} If the network response is not ok.
 */
export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

/**
 * Updates user information with the provided data and token.
 * @param {Object} userData - The updated user data.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
export const updateUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

/**
 * Deletes a user using the provided token.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
export const deleteUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/deleteUser`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
