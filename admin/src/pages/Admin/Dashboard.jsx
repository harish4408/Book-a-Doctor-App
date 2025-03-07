import { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className='m-5'>
        {/* Stats Cards */}
        <div className='flex flex-wrap gap-4'>
          {[
            { icon: assets.doctor_icon, label: 'Doctors', value: dashData.doctors },
            { icon: assets.appointments_icon, label: 'Appointments', value: dashData.appointments },
            { icon: assets.patients_icon, label: 'Patients', value: dashData.patients },
          ].map((stat, index) => (
            <div
              key={index}
              className='flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 min-w-56 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300'
            >
              <img className='w-14' src={stat.icon} alt={stat.label} />
              <div>
                <p className='text-2xl font-bold'>{stat.value}</p>
                <p className='text-lg'>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings */}
        <div className='bg-white shadow-lg rounded-lg mt-10 overflow-hidden'>
          <div className='flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white'>
            <img src={assets.list_icon} alt='list icon' className='w-6' />
            <p className='font-semibold text-lg'>Latest Bookings</p>
          </div>

          <div className='pt-4 border border-t-0'>
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className='flex items-center px-6 py-3 gap-4 hover:bg-gray-100 transition duration-300'
                key={index}
              >
                <img className='rounded-full w-12 border-2 border-indigo-500' src={item.docData.image} alt='Doctor' />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-900 font-medium text-lg'>{item.docData.name}</p>
                  <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className='text-red-500 text-sm font-semibold'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-sm font-semibold'>Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 cursor-pointer hover:scale-110 transition-transform duration-200'
                    src={assets.cancel_icon}
                    alt='Cancel'
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
