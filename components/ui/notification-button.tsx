import { Bell } from "lucide-react";
import React from "react";

interface NotificationButtonProps {
  isActive?: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  isActive,
}) => {
  return (
    <div className="relative flex items-center focus:outline-none">
      <Bell />
      {isActive && (
        <div className="absolute  top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-1 ring-offset-0 ring-white dark:ring-slate-950" />
      )}
    </div>
  );
};

export default NotificationButton;
