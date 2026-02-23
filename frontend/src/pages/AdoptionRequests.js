import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await API.get('/users/adoption-requests');
      setRequests(data.requests);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await API.put(`/adoptions/${requestId}`, { status });
      toast.success(`Request ${status.toLowerCase()}!`);
      fetchRequests();
    } catch (error) {
      toast.error('Failed to update request');
    }
  };

  return (
    <div className="container">
      <h1>Adoption Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No adoption requests yet</p>
      ) : (
        <div>
          {requests.map(request => (
            <div key={request._id} className="card" style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img 
                  src={request.postId.imageUrl} 
                  alt="Pet" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <h3>{request.postId.category}</h3>
                  <p><strong>Requester:</strong> {request.requesterId.name || request.requesterId.phoneNumber}</p>
                  <p><strong>Status:</strong> <span className={`badge badge-${request.status === 'Pending' ? 'primary' : request.status === 'Approved' ? 'success' : 'secondary'}`}>{request.status}</span></p>
                  <p><strong>Requested on:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                {request.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleUpdateStatus(request._id, 'Approved')}
                      className="btn btn-primary"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(request._id, 'Rejected')}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdoptionRequests;
