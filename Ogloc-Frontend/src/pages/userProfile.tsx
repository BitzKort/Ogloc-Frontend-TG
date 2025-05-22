import React, { useState, useEffect } from "react";
import MainLayout from "../layout/mainLayout";
import AvatarMuestra from "../assets/rana-Ogloc.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flame, Activity, Edit2, Trophy } from "lucide-react";

interface UserProfileProps {
  showNavBar: boolean;
}

interface UserInfo {
  name: string;
  username: string;
  exp: number;
  days: number;
  ranking: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ showNavBar }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    username: "",
    exp: 0,
    days: 0,
    ranking: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", username: "" });
  const navigate = useNavigate();

  const onChangePassword = () => navigate('/resetPassword');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth');
      if (!token) return navigate('/auth');
      try {
        const { data } = await axios.get<UserInfo>(
          'http://localhost:8000/userInfo',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserInfo(data);
        setForm({ name: data.name, username: data.username });
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  const toggleEdit = () => {
    if (editMode) {
      // cancel
      setForm({ name: userInfo.name, username: userInfo.username });
    }
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('auth');
    if (!token) return;
    try {
      const { data } = await axios.put<UserInfo>(
        'http://localhost:8000/updateUser',
        { name: form.name.trim(), username: form.username.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserInfo(data);
      setEditMode(false);
    } catch (e) {
      console.error('Error updating user:', e);
    }
  };

  return (
    <MainLayout navBar={showNavBar}>
      <div className="flex flex-col gap-4 p-5 rounded-xl shadow-md backdrop-blur-sm shadow-black/50 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={AvatarMuestra}
            alt="Avatar del usuario"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-white/50"
          />
          <div className="flex-1 flex flex-col text-lg sm:text-xl text-white font-semibold gap-1">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border border-white/50 rounded px-2 py-1 text-white sm:w-50 md:w-70 lg:w-90 placeholder-gray-300"
                />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-white/10 border border-white/50 rounded px-2 py-1 text-white sm:w-50 md:w-70 lg:w-90 placeholder-gray-300"
                />
              </>
            ) : (
              <>
                <span>{userInfo.name}</span>
                <span className="text-gray-300 text-sm sm:text-base">
                  @{userInfo.username}
                </span>
              </>
            )}
            <button
              onClick={onChangePassword}
              className="text-sm text-[#61DECA] hover:underline text-left"
            >
              Cambiar contraseña
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#61DECA]/60 shadow-sm hover:shadow-gray-600"
            >
              <Edit2 className="h-4 w-4" />
              <span className="text-sm sm:text-base">
                {editMode ? 'Cancelar' : 'Editar Perfil'}
              </span>
            </button>
            {editMode && (
              <button
                onClick={handleSave}
                className="mt-2 px-4 py-2 bg-[#61DECA] text-white rounded-xl hover:bg-teal-500 transition"
              >
                Guardar
              </button>
            )}
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="flex flex-col bg-white/10 backdrop-blur-lg items-center rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-white">Racha</h2>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl sm:text-5xl font-bold text-orange-500">
              {userInfo.days}
            </span>
            <div className="flex flex-col">
              <span className="text-orange-200 text-sm">días</span>
              <span className="text-orange-300 text-xs">consecutivos</span>
            </div>
          </div>
        </div>
      
        <div className="flex flex-col bg-white/10 backdrop-blur-lg items-center rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-yellow-500" />
            <h2 className="text-lg font-semibold text-white">Experiencia</h2>
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-yellow-500 mt-2">
            {userInfo.exp}
          </span>
                <span className="text-yellow-200 text-sm">exp</span>
            </div>

            <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 items-center">
                <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-lg font-semibold text-white">Ranking</h2>
                </div>
                <span className="text-4xl sm:text-5xl font-bold text-yellow-500 mt-2">
                    {userInfo.ranking === 0
                        ? '-'
                        : `#${userInfo.ranking}` 
                    }
                </span>
            </div>
        </div>
    </div>
    </MainLayout>
  );
};

export default UserProfile;