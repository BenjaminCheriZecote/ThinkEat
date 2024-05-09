

const ValidateCheck2 = ({handleClick, size, color}) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={`${size}rem`} height={`${size}rem`} viewBox="0,0,256,256"
        style={{fill:"#000000"}} onClick={handleClick}>
            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
                <g transform="scale(6.4,6.4)">
                    <path d="M20,38.5c-10.2,0 -18.5,-8.3 -18.5,-18.5c0,-10.2 8.3,-18.5 18.5,-18.5c10.2,0 18.5,8.3 18.5,18.5c0,10.2 -8.3,18.5 -18.5,18.5z" fill={color} stroke="none" strokeWidth="1"></path>
                    <path d="M20,2c9.9,0 18,8.1 18,18c0,9.9 -8.1,18 -18,18c-9.9,0 -18,-8.1 -18,-18c0,-9.9 8.1,-18 18,-18M20,1c-10.5,0 -19,8.5 -19,19c0,10.5 8.5,19 19,19c10.5,0 19,-8.5 19,-19c0,-10.5 -8.5,-19 -19,-19z" fill={color} stroke="none" strokeWidth="1"></path>
                    <path d="M11.2,20.1l5.8,5.8l13.2,-13.2" fill="none" stroke="#ffffff" strokeWidth="3"></path>
                </g>
            </g>
        </svg>
        
        
    )
}

export default ValidateCheck2;