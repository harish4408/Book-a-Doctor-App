import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
      <p className='mb-4 text-xl font-semibold text-gray-800'>All Appointments</p>
      
      <div className='bg-white rounded-lg shadow-md text-sm max-h-[80vh] overflow-y-auto'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 py-4 px-6 bg-gray-200 font-semibold text-gray-700 rounded-t-lg'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition duration-200'
            key={index}
          >
            <p className='hidden sm:block'>{index + 1}</p>
            <div className='flex items-center gap-3'>
              <img src={item.userData.image} className='w-10 h-10 rounded-full border border-gray-300' alt='' />
              <p className='font-medium'>{item.userData.name}</p>
            </div>
            <p className={`text-xs font-medium px-3 py-1 rounded-full ${item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {item.payment ? 'Online' : 'CASH'}
            </p>
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p className='font-semibold'>{currency}{item.amount}</p>
            {item.cancelled ? (
              <p className='text-red-500 font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 font-medium'>Completed</p>
            ) : (
              <div className='flex gap-3'>
                <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-75' src={assets.cancel_icon} alt='Cancel' />
                <img onClick={() => completeAppointment(item._id)} className='w-8 cursor-pointer hover:opacity-75' src={assets.tick_icon} alt='Complete' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
