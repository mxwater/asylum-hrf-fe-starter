import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container flex flex-col items-center justify-center py-12">
      {isAuthenticated && user ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-[85%] max-w-[280px]">
          {/* User's Photo */}
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full w-20 h-20 mb-4 mx-auto"
            />
          ) : (
            <div className="rounded-full w-20 h-20 mb-4 mx-auto bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-500">
              {user.name?.[0]?.toUpperCase()}
            </div>
          )}

          {/* User's Name */}
          <h2 className="text-lg font-bold mb-2">{user.name}</h2>

          {/* User's Email */}
          {user.email && (
            <p className="text-gray-600 text-sm mb-4">{user.email}</p>
          )}

          {/* Logout Button */}
          <button
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>You must be logged in to see this page.</p>
      )}
    </div>
  );
};

export default Profile;
