import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PopupInfo from './Popups/PopupInfo';
import CardProduct from './UIKit/CardProduct';

const ProductsPanel = ({ productsArray }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [productId, setProductId] = useState(null);

    function changeShowInfo(id) {
        setShowInfo(!showInfo);
        setProductId(id);
    }

    return (
        <>
            <Row className='products'>
                {productsArray.map((item) => {
                    let { id } = item;
                    return (
                        <Col xl={6} xxl={4} lg={6} md={12} className='products__item' key={id}>
                            <CardProduct onClick={() => changeShowInfo(id)} item={item} />
                        </Col>
                    );
                })}
            </Row>
            <PopupInfo id={productId} show={showInfo} onHide={setShowInfo} />
        </>
    );
};

export default ProductsPanel;
