const LoadingSpinner = (percentage: number) => {
    const fullStrokeDashOffset = 722.2;
    const strokeDashOffset =
        fullStrokeDashOffset - fullStrokeDashOffset * (percentage / 100);

    return ` 
        <svg width="250" height="250" viewBox="-31.25 -31.25 312.5 312.5" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
            <circle r="115" cx="125" cy="125" fill="transparent" stroke="#00394d" stroke-width="50" stroke-dasharray="722.2px" stroke-dashoffset="0"></circle>
            <circle r="115" cx="125" cy="125" stroke="#00bfff" stroke-width="33" stroke-linecap="butt" stroke-dashoffset="${strokeDashOffset}px" fill="transparent" stroke-dasharray="722.2px"></circle>
        </svg>
        `;
};

export default LoadingSpinner;
