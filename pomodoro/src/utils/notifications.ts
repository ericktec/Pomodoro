const createNotification = (notificationText: string) => {
    return new Notification("Pomodoro!", {
        body: notificationText,
        // icon: "icon.png" // Optional: URL to an icon for the notification
    });
};

export const notifyUser = async (notificationText: string) => {
    if (!("Notification" in window)) return;

    let notification: Notification | null = null;
    if (Notification.permission === "granted") {
        notification = createNotification(notificationText);
    } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            notification = createNotification(notificationText);
        }
    }

    if (notification) {
        setTimeout(() => {
            if (notification) {
                notification.close();
            }
        }, 5000);
    }
};
