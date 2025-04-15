const Background = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-1 -z-10 *:col-start-1 *:row-start-1 *:col-end-1 *:row-end-1">
            <svg width="526" height="1003" viewBox="0 0 526 1003" fill="red" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
                <path d="M1 307L295.5 2V351C367 315.333 512.1 242.3 520.5 235.5C528.9 228.7 524 480.667 520.5 607.5L85 1001L1 307Z"/>
            </svg>
            <svg width="1607" height="1117" viewBox="0 0 1607 1117" fill="blue" className="opacity-50" xmlns="http://www.w3.org/2000/svg">
                <path d="M1284.5 -63L230.5 99L1 1352.5L1677.5 420.5L1663 -63H1284.5Z"/>
            </svg>
            <svg width="711" height="732" viewBox="0 0 711 732" fill="cyan" className="opacity-50 place-self-end animate-pulse" xmlns="http://www.w3.org/2000/svg" >
                <path d="M1.50004 259.5C6.30004 269.5 476.167 578 710.5 731C710.5 581.5 705.5 282.5 685.5 282.5C660.5 282.5 389 396.5 355 396.5C321 396.5 254 297.5 256 282.5C258 267.5 513 160.5 527.5 160.5C539.1 160.5 440 146.5 389 139.5L113 238.5V160.5C160.667 107.333 252.7 1 239.5 1H37.5C23.5 83 -3.29996 249.5 1.50004 259.5Z" stroke="black"/>
            </svg>


            <div className="bg-black/85 backdrop-blur-[100px]" />
        </div>
    )
}

export default Background;