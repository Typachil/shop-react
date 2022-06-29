import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Context } from '..';
import PopupInfo from './Popups/PopupInfo';
import { observer } from 'mobx-react-lite';

const ProductsPanel = observer(({ productsArray }) => {
    const {products} = useContext(Context);
    const [showInfo, setShowInfo] = useState(false);
    const [productId, setProductId] = useState(null);

    function changeShowInfo(id) {
        setShowInfo(!showInfo);
        setProductId(id)
    }

    function findItemInCart(id){
        return products.cart.filter(item => id === item.id);
    }

    function pushProductToCart(item){
        if(findItemInCart(item.id).length){
            products.deleteCart(item.id);
        }else{
            products.setCartProduct(item);
        }
        localStorage.setItem('Cart', JSON.stringify(products.cart))
    } 
    return (
        <>
            <Row className='products'>
                {productsArray.map((item) => {
                    let { id, img, name, price } = item;
                    return (
                        <Col className="product-card" key={id}>
                            <div className='product-card__img' onClick={() => changeShowInfo(id)}>
                                <img src={img} alt="Фото товара"></img>
                            </div>
                            <div className='product-card__description'>
                                <div className='product-card__name' onClick={() => changeShowInfo(id)}>{name}</div>
                                <div className='product-card__price'>{price} &nbsp;</div>
                                <button onClick={() => pushProductToCart(item)} className='product-card__button'>
                                    {!findItemInCart(item.id).length ? "Добавить в корзину" : <div>В корзине <img src="img/Vector_small.png"></img></div>}
                                </button>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <PopupInfo id={productId} show={showInfo} onHide={changeShowInfo} />
        </>
    )
})

export default ProductsPanel;
