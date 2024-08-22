import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../../../hooks/useAuth';

const VerifyPin = () => {

  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const { handleVerificationPin, error, loading } = useAuth();
  const userId = localStorage.getItem('userId');

  
  


  const handleSubmit = async (e) => {
    const credentials = {"userId": userId, "pin": pin};
    e.preventDefault();
    await handleVerificationPin(credentials);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Verify Your PIN</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="pin" className="form-label">Enter PIN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter the PIN sent to your phone"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify PIN'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPin;
