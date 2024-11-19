const Filter = ({color}) => {

    return(
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 192.000000 192.000000"  preserveAspectRatio="xMidYMid meet" aria-label="Filtre">
            <g transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M98 1703 c-30 -8 -21 -52 19 -97 38 -43 115 -124 368 -391 83 -88 177 -188 208 -222 l57 -63 0 -353 c0 -374 0 -377 47 -377 27 0 336 228 347 255 3 9 6 120 6 246 l0 229 57 63 c31 34 127 136 212 226 374 392 401 423 401 453 0 18 -7 27 -22 32 -26 7 -1674 6 -1700 -1z"/>
            </g> 
        </svg>
    )
}

export default Filter;