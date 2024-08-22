const API_URL = 'http://localhost:3001/rides';
const API_URL_Bookings = 'http://localhost:3001';

const headers = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const fetchRides = async (token) => {
  const response = await fetch(`${API_URL}`, {headers: {
        'Authorization': `Bearer ${token}`,
      } });
  if (!response.ok) throw new Error('Failed to fetch rides');
  return response.json();
};

const fetchRideById = async (id, token) => {
  const token1 = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${id}`, {headers: {
        'Authorization': `Bearer ${token1}`,
      } });
  if (!response.ok) throw new Error('Failed to fetch ride');
  
  return response.json();
};

const fetchRidesByDriver = async (driverId, token) => {
  const response = await fetch(`${API_URL}/driver/${driverId}`, {headers: {
        'Authorization': `Bearer ${token}`,
      } });
  if (!response.ok) throw new Error('Failed to fetch rides by driver');
  return response.json();
};

const fetchBookings = async (driverId, token) => {
  const response = await fetch(`${API_URL_Bookings}/bookings/driver/${driverId}`, {headers: {
    'Authorization': `Bearer ${token}`,
  } });
if (!response.ok) throw new Error('Failed to fetch rides by driver');
return response.json();
};

const createRide = async (rideData, token) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error('Failed to create ride');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error creating ride:', error.message);
    throw error; // re-throw the error to propagate it further if needed
  }
};


const updateRide = async (id, rideData, token) => {
  const token1 = localStorage.getItem('token'); // Use the token parameter instead of token1

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Specify Content-Type for JSON
      },
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error('Failed to update ride');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating ride:', error);
    throw error; // Re-throw the error to handle it outside if needed
  }
};


const deleteRide = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
   headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
  if (!response.ok) throw new Error('Failed to delete ride');
  return response.json();
};

const bookRide = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}/book`, {
    method: 'POST',
   headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
  if (!response.ok) throw new Error('Failed to book ride');
  return response.json();
};

const updateBooking = async (id, bookingData, token) => {
  const token1 = localStorage.getItem('token'); // Use the token parameter instead of token1

  try {
    const response = await fetch(`${API_URL_Bookings}/bookings/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Specify Content-Type for JSON
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error; // Re-throw the error to handle it outside if needed
  }
};



export {
  fetchRides,
  fetchRideById,
  fetchRidesByDriver,
  createRide,
  updateRide,
  deleteRide,
  bookRide,
  fetchBookings,
  updateBooking
};
