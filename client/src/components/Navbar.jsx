import React, { useEffect, useRef } from 'react'
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from '../redux/Auth/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // useLocation hook'u burada kullanılıyor
  
  const { token } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.note);

  useEffect(() => {
    if (token == null) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Şu anki yolun hangi bağlantıyla eşleştiğini belirlemek için yardımcı fonksiyon
  const isActive = (path) => {
    return location.pathname === path ? 'bg-purple-700' : '';
  };

  return (
    <div className='leftnavbar bg-yellow-300 fixed left-0 h-2/3 w-14 flex items-center justify-center mt-32'>
      <div className='flex flex-col gap-y-9'>
        <div>
          <Link to={'/'}>
            <FaHome className={`text-4xl cursor-pointer text-white ${isActive('/')}`} />
          </Link>
        </div>
        <div>
          <Link to={`/profile/${userId}`}>
            <FaUser className={`text-white cursor-pointer text-4xl ${isActive(`/profile/${userId}`)}`} />
          </Link>
        </div>
        <div>
          <Link>
            <HiOutlineLogout className='text-4xl text-white cursor-pointer' onClick={handleLogout} />
          </Link>
        </div>
      </div>
    </div>
  );
}
