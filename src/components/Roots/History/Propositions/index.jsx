import './Proposition.css'
import Proposition from '../../../Layout/UXElements/components/Proposition';


const Propositions = ({history}) => {
    return(
        <>
            <ul className="ulContainer">
                {history.propositions.map((proposition, index) => {
                    return(
                            <Proposition key={index} history={true} proposition={proposition}/>
                    )
                })}
            </ul>
        </>
    )
}
               

export default Propositions;