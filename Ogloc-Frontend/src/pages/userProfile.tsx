import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/mainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Ogloc from "../assets/Ogloc logo 2.png";
import MagicMan from "../assets/rana-Ogloc.svg";
import ElegantFox from "../assets/zorro ogloc.png";
import Penguin from "../assets/pinguino Ogloc fixed.png";
import { Flame, Activity, Edit2, Trophy } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const isValid = useMemo(
    () =>
      form.name.trim().length > 0 &&
      form.name.trim() !== "" &&
      form.username.trim().length > 0 &&
      form.username.trim() !== "",
    [form]
  );

  const isChanged = useMemo(
    () =>
      form.name.trim() !== userInfo.name ||
      form.username.trim() !== userInfo.username,
    [form, userInfo]
  );

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
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const toggleEdit = () => {
    if (editMode) {
      // cancel
      setForm({ name: userInfo.name, username: userInfo.username });
      setErrorMessage("");
    }
    setEditMode(prev => !prev);
  };

  const handleSave = async () => {
    if (!isChanged || !isValid) return;

    const token = localStorage.getItem("auth");
    if (!token) return;

    setErrorMessage("");
    try {
      const { data } = await axios.put<UserInfo>(
        "http://localhost:8000/updateUser",
        { name: form.name.trim(), username: form.username.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserInfo(data);
      setForm({ name: data.name, username: data.username });
      setEditMode(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 406) {
          setErrorMessage(err.response.data.detail || "Error al registrar usuario.");
        } else {
          setErrorMessage(err.response?.data.detail);
        }
      } else {
        setErrorMessage("Error de conexión.");
      }
    }
  };

  return (
    <MainLayout navBar={showNavBar}>
      <SkeletonTheme baseColor="#2e788f" highlightColor="#444">
        <div className="flex flex-col gap-4 p-5 rounded-xl justify-center shadow-md backdrop-blur-sm shadow-black/50 w-full max-w-2xl">

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {loading ? (
              <Skeleton width={100} height={100} circle />
            ) : (
              <img
                src={
                  userInfo.exp < 50 ? Ogloc :
                    userInfo.exp < 100 ? MagicMan :
                      userInfo.exp < 150 ? ElegantFox :
                        Penguin
                }
                alt="Avatar actual"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-contain border border-white/50"
              />
            )}
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
                  {editMode && errorMessage && (
                    <span className="text-red-500 text-sm mt-1">
                      {errorMessage}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span>{loading ? <Skeleton width={100} /> : `${userInfo.name}`}</span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    {loading ? <Skeleton width={100} /> : `@${userInfo.username}`}
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
                  disabled={!(isChanged && isValid)}
                  className={`mt-2 px-4 py-2 rounded-xl transition ${isChanged && isValid
                      ? "bg-[#61DECA] text-white hover:bg-teal-500"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
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
                  {loading ? <Skeleton width={50} /> : `${userInfo.days}`}
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
                {loading ? <Skeleton width={50} /> : `${userInfo.exp}`}
              </span>
              <span className="text-yellow-200 text-sm">exp</span>
            </div>

            <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 items-center">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h2 className="text-lg font-semibold text-white">Ranking</h2>
              </div>
              <span className="text-4xl sm:text-5xl font-bold text-yellow-500 mt-2">
                {
                  loading ? (
                    <Skeleton width={50} />
                  ) : userInfo.ranking === 0 ? (
                    '-'
                  ) : (
                    `#${userInfo.ranking}`
                  )
                }
              </span>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </MainLayout>
  );
};

export default UserProfile;