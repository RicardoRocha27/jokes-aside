"use client";
import React, { useState } from "react";
import NotificationButton from "./ui/notification-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Notification, NotificationType } from "@prisma/client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const router = useRouter();

  const activeNotifications = notifications.find(
    (notification) => notification.isActive
  );
  const [isActive, setIsActive] = useState(activeNotifications != undefined);

  const notificationText = (
    username: string,
    postTitle: string,
    comment?: string,
    type?: NotificationType
  ) => {
    if (type === "LIKE") {
      return `${username} has liked your ${postTitle} post.`;
    }

    let formattedComment = comment;

    if (comment!.length > 40) {
      formattedComment = `${comment?.substring(0, 40)}... `;
    }

    return `${username} has commented "${formattedComment}" on your ${postTitle} post.`;
  };

  const setInactive = async () => {
    if (activeNotifications) {
      await axios.patch("/api/received-notifications", { isActive: false });
      setIsActive(false);
    }
  };

  const deleteNotification = async (id: string) => {
    await axios.delete(`/api/received-notifications/${id}`);
    router.refresh();
  };

  const clearNotifications = async () => {
    await axios.delete("/api/received-notifications");
    router.refresh();
  };

  return (
    <DropdownMenu onOpenChange={setInactive}>
      <DropdownMenuTrigger className="focus:outline-none">
        <NotificationButton isActive={isActive} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="relative mt-4  bottom-2 w-screen h-96 sm:w-96 overflow-y-auto"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <p>Notifications</p>
          <p
            onClick={clearNotifications}
            className="text-xs text-muted-foreground font-medium cursor-pointer"
          >
            Clear All
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-y-2">
          {notifications.length === 0 && (
            <p className="text-muted-foreground text-sm px-2">
              No notifications.
            </p>
          )}
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <div className="flex items-center justify-between p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Image
                    className="flex rounded-full"
                    //@ts-ignore
                    src={notification.sender.imageUrl}
                    alt=""
                    width={35}
                    height={35}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, {
                        addSuffix: true,
                      })}
                    </p>
                    <p className="text-sm">
                      {notificationText(
                        //@ts-ignore
                        notification.sender.username,
                        //@ts-ignore
                        notification.post.title,
                        //@ts-ignore
                        notification.value,
                        notification.type
                      )}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => deleteNotification(notification.id)}
                  className="flex cursor-pointer"
                >
                  <Trash size={16} />
                </div>
              </div>
              {index != notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
