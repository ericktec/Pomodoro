export type BackgroundSolidType = { type: "solid"; color: string };
export type BackgroundGradientType = { type: "gradient"; className: string };
export type BackgroundImage = { type: "image"; path: string };

export type BackgroundTypes =
    | BackgroundSolidType
    | BackgroundImage
    | BackgroundGradientType;
