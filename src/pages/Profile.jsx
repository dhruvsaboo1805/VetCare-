import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const user_profile_api = import.meta.env.VITE_API_URL_USER_PROFILE;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          throw new Error('Authentication token is missing!');
        }

        const response = await axios.get(user_profile_api, {
          headers: {
            Authorization: `${authToken}`,
          },
        });

        setUserProfile(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    <Loader />
  }



  return (
    // <div className="min-h-screen bg-gray-100 p-6">
    //   <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
    //     <h1 className="text-2xl font-bold text-gray-800 mb-4">
    //       User Profile
    //     </h1>
    //     <div className="flex items-center space-x-6">
    //       {/* <img
    //         src={userProfile.avatar || 'https://via.placeholder.com/150'}
    //         alt="User Avatar"
    //         className="w-24 h-24 rounded-full border border-gray-300"
    //       /> */}
    //       <div>
    //         <h2 className="font-semibold text-gray-700">
    //         <strong>Name:</strong>{userProfile.full_name}
    //         </h2>
    //         <p className="text-gray-600">
    //           <strong>Email:</strong> {userProfile.email}
    //         </p>
    //         <p className="text-gray-600">
    //           <strong>Phone:</strong> {userProfile.phone_num || 'N/A'}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="mt-6">
    //       <h3 className="text-lg font-semibold text-gray-700">Address</h3>
    //       <p className="text-gray-600 mt-2">
    //         {userProfile.address || 'No address provided.'}
    //       </p>
    //     </div>
    //     <div className="mt-6">
    //       <h3 className="text-lg font-semibold text-gray-700">Family Doctor Info</h3>
    //       <p className="text-gray-600 mt-2">
    //       <strong>Name: </strong>{userProfile.vet_info.full_name || 'No information provided.'}
    //       </p>
    //       <p className="text-gray-600 mt-2">
    //       <strong>Phone: </strong>{userProfile.vet_info.phone_num || 'No information provided.'}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <></>
    
  );
};

export default Profile;
