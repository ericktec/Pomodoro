import { useState } from "react";
import SwitcherInput from "../switcher/Switcher";
import { askNotificationPermissions } from "../../utils/notifications";

const NotificationSettings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
        () => {
            const notificationsEnabledLocalStorage =
                localStorage.getItem("notifications");

            if (!notificationsEnabledLocalStorage) return false;

            return notificationsEnabledLocalStorage === "true" ? true : false;
        }
    );
    const onChangeNotificationSetting = async () => {
        setNotificationsEnabled((prev) => {
            const notificationSetting = !prev;
            if (notificationSetting) {
                askNotificationPermissions();
            }

            localStorage.setItem(
                "notifications",
                notificationSetting.toString()
            );
            return notificationSetting;
        });
    };

    return (
        <section>
            <div className="autoStartSettings__inputContainer">
                <p>Notifications</p>
                <SwitcherInput
                    label="Auto Start pomodoros"
                    id="autoStartPomodoros"
                    checked={notificationsEnabled}
                    onChange={onChangeNotificationSetting}
                />
            </div>
        </section>
    );
};

export default NotificationSettings;
