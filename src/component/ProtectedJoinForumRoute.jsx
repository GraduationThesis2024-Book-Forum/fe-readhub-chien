import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedJoinForumRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const isBanned = (user?.forumJoinBanned) &&
    (user?.forumJoinBanExpiresAt === null || new Date(user?.forumJoinBanExpiresAt) > new Date());

  if (isBanned) {
    const banMessage = user?.forumJoinBanExpiresAt
      ? `You are banned until ${new Date(user?.forumJoinBanExpiresAt).toLocaleString()}: ban join`
      : `You are permanently banned: ban join`;

    toast.error(banMessage);
    return <Navigate to="/book-forum" replace />;
  }

  return children;
};

export default ProtectedJoinForumRoute;