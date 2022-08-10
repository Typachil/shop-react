import React, { useContext, useState } from 'react';
import { Context } from '..';
import PopupCart from './Popups/PopupCart';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-bootstrap';

const Header = observer(() => {
    const [showCart, setShowCart] = useState(false);
    const { products } = useContext(Context);

    function changeCurrentCategory(item) {
        products.setCurrentСategory(item);
        products.setCurrentType(products.types.filter((item) => item.parent_id === products.currentСategory.id)[0]);
    }

    return (
        <div className='header'>
            <div className='header-nav'>
                <NavLink href='#' className='header-nav__logo'>
                    <img src='img/Logo.png' alt='Лого'></img>
                    <div className='header-nav__logo-text'>SHOP</div>
                </NavLink>
                <div className='header-nav__categories'>
                    {products.categories.map((item) => {
                        let { id, name } = item;
                        let style = 'header-nav__category';
                        if (id === products.currentСategory.id) style += ' header-nav__category_active';

                        return (
                            <NavLink
                                tabIndex='0'
                                href='#'
                                key={id}
                                className={style}
                                onClick={() => changeCurrentCategory(item)}>
                                <div className='header-nav__text'>{name}</div>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <button tabIndex='1' className='header__cart' onClick={() => setShowCart(!showCart)}>
                <img src='img/Cart.png' alt='Корзина'></img>
                {!products.cart.length || <div className='header__cart-number'>{products.cart.length}</div>}
            </button>
            <PopupCart show={showCart} onHide={() => setShowCart(!showCart)} />
        </div>
    );
});

export default Header;
