import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Context } from '..';
import PopupInfo from './Popups/PopupInfo';
import { observer } from 'mobx-react-lite';
import Button from './UIKit/Button';
import CardProduct from './UIKit/CardProduct';

const ProductsPanel = ({ productsArray }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [productId, setProductId] = useState(null);

    function changeShowInfo(id) {
        setShowInfo(!showInfo);
        setProductId(id)
    }

    return (
        <>
            <Row className='products'>
                {productsArray.map((item) => {
                    let { id } = item;
                    return (
                        <CardProduct key={id} onClick={() => changeShowInfo(id)} item={item}/>
                    )
                })}
            </Row>
            <PopupInfo id={productId} show={showInfo} onHide={setShowInfo} />
        </>
    )
};

export default ProductsPanel;
