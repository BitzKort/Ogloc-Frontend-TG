import React, { useState } from "react";
import MainLayout from "../layout/mainLayout";

import Ogloc from "../assets/Ogloc logo 2.png";
import MagicMan from "../assets/rana-Ogloc.svg";
import ElegantFox from "../assets/zorro ogloc.png";
import Penguin from "../assets/pinguino Ogloc fixed.png";

import Avatar from "../components/badgeComponent";

interface StorePageProps {
  showNavBar: boolean;
}

interface BadgeCard {
  avatarImage: string;
  avatarName: string;
  exp: number;
  state: string;
  description: string;
}

const StorePage: React.FC<StorePageProps> = ({ showNavBar }) => {
  const badges: BadgeCard[] = [
    {
      avatarImage: Ogloc,
      avatarName: "Ogloc",
      exp: 0,
      state: "Novato",
      description: "¿Nuevo en la aventura? Prepárate para dar tus primeros pasos."
    },
    {
      avatarImage: MagicMan,
      avatarName: "MagicMan",
      exp: 100,
      state: "Avanzado",
      description: "Tu dedicación y talento te han traído hasta aquí. Sigue rompiendo tus propios límites."
    },
    {
      avatarImage: ElegantFox,
      avatarName: "Elegant",
      exp: 150,
      state: "Épico",
      description: "Te has elevado al reino Épico con elegancia inigualable"
    },
    {
      avatarImage: Penguin,
      avatarName: "5y5tem 5oul5",
      exp: 200,
      state: "Legendario",
      description: "Al compás de sintetizadores infinitos, nuestro trabajo nunca termina; una vez más, una lección a la vez."
    }
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<BadgeCard>(badges[0]);

  const stateColor = () => {
    switch (selectedAvatar.state) {
      case "Legendario":
        return "text-yellow-500";
      case "Avanzado":
        return "text-green-500";
      case "Épico":
        return "text-purple-700";
      case "Raro":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <MainLayout navBar={showNavBar}>
      <div className="flex flex-col md:flex-row  items-start w-full gap-5 p-4">
        {/* Badge List (carousel on mobile) */}
        <div className="flex overflow-x-auto md:overflow-visible gap-4 p-2 bg-white/50 rounded-xl w-full md:w-auto snap-x snap-mandatory scrollbar-hide">
          {badges.map((badge, index) => (
            <div className="flex-shrink-0 md:flex-shrink" key={index}>
              <Avatar onSelect={() => setSelectedAvatar(badge)} avatarInfo={badge} />
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full md:w-1/3 text-white justify-center items-center p-5 bg-white/10 rounded-xl">
          <img
            className="w-40 h-40 object-contain rounded-full p-2 border"
            src={selectedAvatar.avatarImage}
            alt={selectedAvatar.avatarName}
          />
          <span>@{selectedAvatar.avatarName}</span>
          <span>{selectedAvatar.exp} exp</span>
          <span className={stateColor()}>{selectedAvatar.state}</span>
          <span className="text-center mt-2">{selectedAvatar.description}</span>
        </div>
      </div>
    </MainLayout>
  );
};

export default StorePage;
