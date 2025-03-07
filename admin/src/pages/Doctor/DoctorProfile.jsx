import { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
            src={profileData.image}
            alt=""
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600 mt-1">{profileData.degree} - {profileData.speciality}</p>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              {profileData.experience} years experience
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">About</h3>
          {isEdit ? (
            <textarea
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows={5}
              value={profileData.about}
              onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600 mt-2">{profileData.about}</p>
          )}
        </div>

        {/* Appointment Fee & Address */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Appointment Fee</h3>
          {isEdit ? (
            <input
              type="number"
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={profileData.fees}
              onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
            />
          ) : (
            <p className="text-gray-600">{currency} {profileData.fees}</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Address</h3>
          {isEdit ? (
            <>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
              />
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
              />
            </>
          ) : (
            <p className="text-gray-600">{profileData.address.line1}, {profileData.address.line2}</p>
          )}
        </div>

        {/* Availability Toggle */}
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600"
            checked={profileData.available}
            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
          />
          <label className="ml-2 text-gray-700">Available for Appointments</label>
        </div>

        {/* Edit & Save Button */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
