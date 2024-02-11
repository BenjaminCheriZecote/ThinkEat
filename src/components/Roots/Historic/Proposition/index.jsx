import './Proposition.scss'

import { FaCheck } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'


const Proposition = ({proposition}) => {
    console.log(proposition)
    return(
        <>
            <ul className="ulContainer">
                {proposition.historic.array.map((proposition, index) => {
                    return(
                            <li key={index} className={proposition.validate? "liProposotion validate":"liProposotion unvalidate"}>
                                <div className="liProposotion__imgContainer">
                                    <img src={proposition.image} alt="" />
                                </div>
                                <p className="liProposotion__p--name">{proposition.name}</p>

                                <div className="liProposotion__choiceBox">
                                    {/* <FaPerson /> */}
                                    {/* <FaCheck />
                                    <MdCancel /> */}
                                    <IoCartOutline />
                                </div>
                            </li>
                    )
                })}
            </ul>
        </>
    )
}
               

export default Proposition