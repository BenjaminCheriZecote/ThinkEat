import { FaCloudDownloadAlt } from "react-icons/fa";
import style from './index.module.css';

const DownloadCloud = ({handleClick, size, color}) => {
    return(
        <FaCloudDownloadAlt size={size} onClick={handleClick} style={{color:color}}/>
    )
}

export default DownloadCloud;