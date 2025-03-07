import axios from 'axios';
import { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(backendUrl + url, { email, password });

      if (data.success) {
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token);
        localStorage.setItem(state === 'Admin' ? 'aToken' : 'dToken', data.token);
        toast.success('Login Successful');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#002147] to-white">
      <div className="flex flex-col gap-5 p-8 w-full max-w-sm bg-white shadow-lg rounded-lg text-gray-700 border border-gray-300">
        <p className="text-2xl font-semibold text-center">
          <span className="text-[#002147]">{state}</span> Login
        </p>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email" 
            className="border rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-[#002147]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input 
            type={showPassword ? 'text' : 'password'} 
            className="border rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-[#002147]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-500 hover:text-[#002147] transition"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        <button className="bg-[#002147] text-white w-full py-3 rounded-lg text-lg font-medium hover:opacity-90 transition">
          Login
        </button>

        <p className="text-sm text-center">
          {state === 'Admin' ? "Doctor Login?" : "Admin Login?"}
          <span 
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')} 
            className="text-[#002147] underline cursor-pointer ml-1 hover:text-gray-700 transition"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
