import { ReactNode, createContext, useState } from "react";

const NotificationContext = createContext(
  {} as {
    notification: string | null;
    notificationText: string | null;
    success: (text: string) => void;
    error: (text: string) => void;
    clear: () => void;
  }
);

const STATES = {
  SUCCESS: "success",
  ERROR: "error",
};

type Props = {
  children: ReactNode;
};

const NotificationProvider: React.FC<Props> = (props) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationText, setNotificationText] = useState<string | null>(null);

  const success = (text: string) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
  };

  const error = (text: string) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.ERROR);
  };

  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ success, error, clear, notification, notificationText }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;
