import React, { useState } from 'react';
import PopupCart from './Popups/PopupCart';

export default function Header() {
    const [showCart, setShowCart] = useState(false);
    
    return (
        <div className='header'>
            <div className='header-nav'>
                <a href='#' className='header-nav__logo'>
                    <img src='img/Logo.png' alt="Лого"></img>
                    <div className='header-nav__logo-text'>SHOP</div>
                </a>
                <div className='header-nav__categories'>
                    <a href='#' className='header-nav__category header-nav__category_active'><div className='header-nav__text'>Электроприборы</div></a>
                    <a href='#' className='header-nav__category'><div className='header-nav__text'>Мебель</div></a>
                </div>
            </div>
            <div className='header__cart' onClick={() => setShowCart(!showCart)}>
                <img src="img/Cart.png" alt="Корзина"></img>
                <div className='header__cart-number'>99+</div>
            </div>
            <PopupCart show={showCart} onHide={() => setShowCart(!showCart)} />
        </div>
    )
}
