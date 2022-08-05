import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { Context } from '../..';
import Button from './Button'

export default function CardProduct({item, onClickCard, onClickButton, findItemInCart, ...attrs}) {
    let { id, img, name, price } = item;
    console.log('fas')

    return (
        <Col xl={6} xxl={4} lg={6} md={12} className="product-card" {...attrs}>
            <div className='product-card__img' onClick={() => onClickCard(id)}>
                <img src={img} alt="Фото товара"></img>
            </div>
            <div className='product-card__description'>
                <div className='product-card__name' onClick={() => onClickCard(id)}>{name}</div>
                <div className='product-card__price'>{price} &nbsp;</div>
                <Button onClick={() => onClickButton(item)} classes='product-card__button'>
                    {!findItemInCart(id).length ? "Добавить в корзину" : <div>В корзине <img src="img/Vector_small.png" alt="Vector"></img></div>}
                </Button>
            </div>
        </Col>
    )
}
