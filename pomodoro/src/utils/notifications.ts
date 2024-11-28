const createNotification = (notificationText: string) => {
    return new Notification("Pomodoro!", {
        body: notificationText,
        // icon: "icon.png" // Optional: URL to an icon for the notification
    });
};

export const askNotificationPermissions = async (): Promise<boolean> => {
    if (!("Notification" in window)) return false;
    if (
        Notification.permission === "default" ||
        Notification.permission === "denied"
    ) {
        const notificationResponse = await Notification.requestPermission();
        if (notificationResponse === "denied") return false;
        return true;
    }
    return true;
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

export const changeTabTile = (tabTitle: string = "Pomodoro Timer") => {
    document.title = tabTitle;
};

export const changeTabIcon = (tabIcon: string = "favicon.ico") => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "icon");
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.setAttribute("href", tabIcon);
    if (tabIcon !== "favicon.ico") {
        // Optional: Set type for SVG icons
        link.setAttribute("type", "image/svg+xml");

        // Optional: Cache busting with a unique query parameter
        link.setAttribute("href", `${tabIcon}`);
    }
};
