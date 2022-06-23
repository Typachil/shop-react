import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import PopupInfo from './Popups/PopupInfo';

export default function ProductsPanel() {
    const [showInfo, setShowInfo] = useState(false);

    function changeShowInfo(){
        setShowInfo(!showInfo)
    }
    return (
        <>
            <Row className='products'>
                <Col className="product-card">
                    <div className='product-card__img' onClick={changeShowInfo}>
                        <img src="/img/Chair.png" alt="Фото товара"></img>
                    </div>
                    <div className='product-card__description'>
                        <div className='product-card__name' onClick={changeShowInfo}>Стул рабочий</div>
                        <div className='product-card__price'>6 000 &nbsp;</div>
                        <button className='product-card__button'>Добавить в корзину</button>
                    </div>
                </Col>
            </Row>
            <PopupInfo show={showInfo} onHide={changeShowInfo}/>
        </>
    )
}
