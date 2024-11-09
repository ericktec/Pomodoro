import { BackgroundTypes } from "../types/backgrounds";
import { createContext } from "react";

type HomeBackGroundContextType = {
    setBackground: (background: BackgroundTypes) => void;
};

const HomeBackGroundContext = createContext<HomeBackGroundContextType>({
    setBackground(background) {},
});

export default HomeBackGroundContext;
