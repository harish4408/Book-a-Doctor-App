import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-6 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-2xl font-semibold text-blue-700'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-6 pt-5'>
        {doctors.map((item, index) => (
          <div
            className='bg-white border border-blue-300 shadow-lg rounded-xl max-w-60 p-4 cursor-pointer group transition-transform hover:scale-105'
            key={index}
          >
            <img
              className='w-full h-40 object-cover rounded-t-xl group-hover:opacity-90 transition-all duration-500'
              src={item.image}
              alt={item.name}
            />
            <div className='mt-4 text-center'>
              <p className='text-lg font-bold text-gray-800'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>
              <div className='mt-3 flex items-center justify-center gap-2'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className='sr-only peer'
                  />
                  <div className='w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                </label>
                <p className='text-sm font-medium text-gray-600'>{item.available ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
