import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import PopupCart from './Popups/PopupCart';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
    const [showCart, setShowCart] = useState(false);
    const { products } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('Cart')) products.setCart(JSON.parse(localStorage.getItem('Cart')));
    }, [])

    function changeCurrentCategory(item) {
        products.setCurrentСategory(item);
        products.setCurrentType(products.types.filter(item => item.parent_id === products.currentСategory.id)[0]);
    }

    return (
        <div className='header'>
            <div className='header-nav'>
                <a href='#' className='header-nav__logo'>
                    <img src='img/Logo.png' alt="Лого"></img>
                    <div className='header-nav__logo-text'>SHOP</div>
                </a>
                <div className='header-nav__categories'>
                    {products.categories.map((item) => {
                        let { id, name } = item;
                        let style = 'header-nav__category';
                        if (id === products.currentСategory.id) style += ' header-nav__category_active';

                        return (
                            <a tabIndex="0" href='#' key={id} className={style} onClick={() => changeCurrentCategory(item)}><div className='header-nav__text'>{name}</div></a>
                        )
                    })}
                </div>
            </div>
            <a tabIndex="1" className='header__cart' onClick={() => setShowCart(!showCart)}>
                <img src="img/Cart.png" alt="Корзина"></img>
                {!products.cart.length || <div className='header__cart-number'>{products.cart.length}</div>}
            </a>
            <PopupCart show={showCart} onHide={() => setShowCart(!showCart)} />
        </div>
    )
})

export default Header;
