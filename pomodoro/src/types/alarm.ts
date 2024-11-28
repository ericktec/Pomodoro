export type AlarmSettingsType = {
    volume: number;
    soundPath: string | null;
};

export type AlarmSettingsProfile = {
    label: string;
    iconClassName?: string;
    soundPath: string | null;
};
