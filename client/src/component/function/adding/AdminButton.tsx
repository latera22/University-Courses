import React from "react";

interface AdminButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AdminButton: React.FC<AdminButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-48 h-12 transition-colors duration-300"
    >
      {children}
    </button>
  );
};

export default AdminButton;
