import { createPortal } from 'react-dom';
import './FruitDecor.css';
import FRUITS from './fruits';

const FruitDecor = ({ fruit, place, size = 9, outside = false, style }) => {
    const src = FRUITS[fruit];
    if (!src) {
        return null;
    }

    const image = (
        <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable="false"
            className={place ? `fruitDecor fruitDecor--${place}` : 'fruitDecor'}
            style={{ '--fruitDecor-size': `${size}rem`, ...style }}
        />
    );

    if (!outside) return image;

    const layer = document.getElementById('decor');
    return layer ? createPortal(image, layer) : null;
};

export default FruitDecor;
