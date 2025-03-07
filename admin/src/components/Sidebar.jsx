import { useContext } from 'react'
import PropTypes from 'prop-types'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen w-64 bg-white border-r border-gray-300 shadow-lg'>
      <div className='p-6 text-center font-semibold text-xl tracking-wide text-blue-700'>
        Hospital Panel
      </div>

      {aToken && (
        <ul className='mt-5'>
          <SidebarItem to='/admin-dashboard' icon={assets.home_icon} label='Dashboard' />
          <SidebarItem to='/all-appointments' icon={assets.appointment_icon} label='Appointments' />
          <SidebarItem to='/add-doctor' icon={assets.add_icon} label='Add Doctor' />
          <SidebarItem to='/doctor-list' icon={assets.people_icon} label='Doctors List' />
        </ul>
      )}

      {dToken && (
        <ul className='mt-5'>
          <SidebarItem to='/doctor-dashboard' icon={assets.home_icon} label='Dashboard' />
          <SidebarItem to='/doctor-appointments' icon={assets.appointment_icon} label='Appointments' />
          <SidebarItem to='/doctor-profile' icon={assets.people_icon} label='Profile' />
        </ul>
      )}
    </div>
  )
}

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300 
      ${isActive ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-600' : 'hover:bg-blue-50'}`
    }
  >
    <img className='w-5' src={icon} alt={label} />
    <p className='opacity-90'>{label}</p>
  </NavLink>
)

// ✅ Add PropTypes for validation
SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default Sidebar
