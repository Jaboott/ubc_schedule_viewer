import { convertDecimalTime } from "../../../util/utils";
import { useState, useEffect } from "react";

function TimeLine() {

    const [time, setTime] = useState(null);

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            const time = hours + minutes / 60;
            setTime(time);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 10000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        (time > 8 && time < 23) &&
        <div
            className="absolute z-40 w-full"
            style={{ marginTop: 54 + 56 * (time - 8) }}
        >
            <div className="flex items-center">
                <div className="flex w-[80px] justify-end">
                    <h1 className="mr-4 text-[#d66d71] bg-[#1e1f28] text-sm font-medium">{convertDecimalTime(time)}</h1>
                </div>
                <hr className="border-[#c65f64] grow" />
            </div>
        </div>
    )
}

export default TimeLine;