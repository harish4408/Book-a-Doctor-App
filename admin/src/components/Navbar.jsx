import { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-6 sm:px-12 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-500 shadow-md'>
      <div className='flex items-center gap-3'>
        <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer drop-shadow-lg' src={assets.admin_logo} alt="Logo" />
        <p className='px-3 py-1 rounded-full text-white bg-white/20 backdrop-blur-md shadow-sm border border-white/30'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button 
        onClick={logout} 
        className='bg-blue-500 text-white font-semibold px-8 py-2 rounded-full transition-all duration-300 hover:bg-blue-900 shadow-md'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
