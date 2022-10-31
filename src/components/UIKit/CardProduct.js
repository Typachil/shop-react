import React, { useContext } from 'react'
import { Context } from '../..';
import Button from './Button';
import { observer } from 'mobx-react-lite';

const CardProduct = observer(({item, onClick, ...attrs}) => {
    let { id, img, name, price } = item;
    let {products} = useContext(Context);

    function findItemInCart(id) {
        return products.cart.filter(item => id === item.id);
    }

    function pushProductToCart(item) {
        if (findItemInCart(item.id).length) {
            products.deleteCart(item.id);
        } else {
            products.setCartProduct(item);
        }
        localStorage.setItem('Cart', JSON.stringify(products.cart))
    }

    return (
        <div className="product-card" {...attrs}>
            <div className='product-card__img' onClick={onClick}>
                <img src={img} alt="Фото товара"></img>
            </div>
            <div className='product-card__description'>
                <div className='product-card__name' onClick={onClick}>{name}</div>
                <div className='product-card__price'>{price} &nbsp;</div>
                <Button onClick={() => pushProductToCart(item)} classes='product-card__button'>
                    {!findItemInCart(id).length ? "Добавить в корзину" : <div>В корзине <img src="img/Vector_small.png" alt="Vector"></img></div>}
                </Button>
            </div>
        </div>
    )
})

export default CardProduct;
