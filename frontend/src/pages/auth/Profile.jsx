import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleEditProfile = () => {
    // Logika untuk mengarahkan pengguna ke halaman edit profil
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col items-start mb-4">
       
        <p>
          <span className="font-semibold">Full Name:</span> {userInfo.full_name}
        </p>
        <p>
          <span className="font-semibold">Bio:</span> {userInfo.bio}
        </p>
      </div>
      <div className="mb-4">
        <img
          src={`http://127.0.0.1:8000/${userInfo.image}`}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <button
        onClick={handleEditProfile}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
