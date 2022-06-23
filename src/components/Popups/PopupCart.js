import { Offcanvas, Row, Col } from 'react-bootstrap';
import React from 'react';

export default function PopupCart({show, onHide}) {

  return (
    <>
      <Offcanvas className='popup-product' show={show} onHide={onHide} placement={'end'}>
        <Offcanvas.Header closeButton>
          Оформить заказ
        </Offcanvas.Header>
        <Offcanvas.Body>
          В корзине:
          <div className='popup-product__items'>
            <div className='popup-product__item'>
              <img src="img/Chair.png" alt="Фото товара" />
              <div className='popup-product__description'>
                <div className='product-card__name'>Стул рабочий</div>
                <div className='product-card__price'>6 000 &nbsp;</div>
                <button className='popup-product__button'>Убрать из корзины</button>
              </div>
            </div>
            <div className='popup-product__item'>
              <img src="img/Chair.png" alt="Фото товара" />
              <div className='popup-product__description'>
                <div className='product-card__name'>Стул рабочий</div>
                <div className='product-card__price'>6 000 &nbsp;</div>
                <button className='popup-product__button'>Убрать из корзины</button>
              </div>
            </div>
          </div>
          <form className='cart-form'>
            <Row>
              <Col xs={6}>
                <label>
                  <div>Имя</div>
                  <input type='text' name='name' className='input-name' />
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div>Телефон</div>
                  <input type='tel' name='tel' className='input-tel' />
                </label>
              </Col>
              <Col xs={12}>
                <label className='label-address'>
                  <div>Полный адрес</div>
                  <input type='text' name='address' className='input-address' />
                </label>
              </Col>
            </Row>
            <button className='product-card__button'>Заказать</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
