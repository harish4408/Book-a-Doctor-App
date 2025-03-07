import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-4'>
        {[{
          icon: assets.earning_icon,
          value: `${currency} ${dashData.earnings}`,
          label: 'Earnings',
          gradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
        }, {
          icon: assets.appointments_icon,
          value: dashData.appointments,
          label: 'Appointments',
          gradient: 'bg-gradient-to-r from-green-400 to-teal-500'
        }, {
          icon: assets.patients_icon,
          value: dashData.patients,
          label: 'Patients',
          gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }].map((item, index) => (
          <div key={index} className={`flex items-center gap-4 ${item.gradient} text-white p-5 min-w-52 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all`}>
            <img className='w-14' src={item.icon} alt='' />
            <div>
              <p className='text-2xl font-bold'>{item.value}</p>
              <p className='text-lg'>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-white shadow-lg rounded-lg mt-10 overflow-hidden'>
        <div className='flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-gray-800 to-gray-600 text-white'>
          <img src={assets.list_icon} alt='' className='w-6' />
          <p className='font-semibold text-lg'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0 rounded-b-lg'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-100 transition-all' key={index}>
              <img className='rounded-full w-12 border-2 border-gray-300' src={item.userData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-900 font-semibold'>{item.userData.name}</p>
                <p className='text-gray-700'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-500 font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 font-medium'>Completed</p>
              ) : (
                <div className='flex gap-3'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-80' src={assets.cancel_icon} alt='' />
                  <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-80' src={assets.tick_icon} alt='' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;