import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !user) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className='text-center p-4'>You need to log in to access this page.</div>;
  }

  return (
    <div className="profile-page text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <img
        src={user.picture}
        alt={user.name}
        className="rounded-full w-32 h-32 mx-auto mb-4"
      />
      <h2 className="text-xl">{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
