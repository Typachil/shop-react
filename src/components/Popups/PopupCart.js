import { Offcanvas, Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import EmptyStub from '../EmptyStub';
import useHttp from '../../hooks/useHttp';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const PopupCart = observer(({ show, onHide }) => {
  const { loading, request, error, clearError } = useHttp();
  const { products } = useContext(Context);
  const [orderCreated, setOrderCreated] = useState(false);
  const [formName, setFormName] = useState({ name: "", nameValid: false });
  const [formTel, setFormTel] = useState({ tel: "", telValid: false });
  const [formAddress, setFormAddress] = useState({ address: "", addressValid: false });

  function submitForm(event) {
    event.preventDefault();
    if (formName.nameValid && formTel.telValid && formAddress.addressValid) {
      products.setCart([]);
      request('http://test1.web-gu.ru/?action=send_form').then(data => {
        setOrderCreated(data.result);
        if (data.result) {
          localStorage.clear();
        }
      });
    }
  }

  function validInput(value) {
    return value.length > 0;
  }

  function changeFormName(event) {
    setFormName({ 'name': event.target.value, 'nameValid': validInput(event.target.value) });
  }

  function changeFormTel(event) {
    setFormTel({ 'tel': event.target.value, 'telValid': validInput(event.target.value) });
  }

  function changeFormAddress(event) {
    setFormAddress({ 'address': event.target.value, 'addressValid': validInput(event.target.value) });
  }

  function deleteProductFromCart(id) {
    products.deleteCart(id);
    localStorage.setItem('Cart', JSON.stringify(products.cart));
  }

  return (
    <>
      <Offcanvas onExiting={() => setOrderCreated(false)} className='popup-product' show={show} onHide={onHide} placement={'end'}>
        <Offcanvas.Header closeButton>
          Оформить заказ
        </Offcanvas.Header>
        {products.cart.length ?
          <Offcanvas.Body>
            В корзине:
            <div className='popup-product__items'>
              {products.cart.map((item) => {
                let { id, name, price, img } = item;
                return (<div className='popup-product__item' key={id}>
                  <img src={img} alt="Фото товара" />
                  <div className='popup-product__description'>
                    <div className='product-card__name'>{name}</div>
                    <div className='product-card__price'>{price} &nbsp;</div>
                    <button className='popup-product__button' onClick={() => deleteProductFromCart(id)}>Убрать из корзины</button>
                  </div>
                </div>)
              })}
            </div>
            <form className='form-popup' onSubmit={submitForm}>
              <Row>
                <Col className='mt-3' sm={12} md={6}>
                  <label className='w-100'>
                    <div>Имя</div>
                    <input type='text' name='name' className='input-name' style={{ borderColor: !formName.nameValid && '#FF6969' }}
                      value={formName.name} onChange={changeFormName} />
                    {!formName.nameValid && <div className='input_warning'>Имя не должно быть пустым</div>}
                  </label>
                </Col>
                <Col className='mt-3' sm={12} md={6}>
                  <label className='w-100'>
                    <div>Телефон</div>
                    <input type='tel' name='tel' className='input-tel' style={{ borderColor: !formTel.telValid && '#FF6969' }}
                      value={formTel.tel} onChange={changeFormTel} />
                    {!formTel.telValid && <div className='input_warning'>Телефон не должен быть пустым</div>}
                  </label>
                </Col>
                <Col xs={12}>
                  <label className='label-address'>
                    <div>Полный адрес</div>
                    <input type='text' name='address' className='input-address' style={{ borderColor: !formAddress.addressValid && '#FF6969' }}
                      value={formAddress.address} onChange={changeFormAddress} />
                    {!formAddress.addressValid && <div className='input_warning'>Адрес не должен быть пустым</div>}
                  </label>
                </Col>
              </Row>
              <button className='product-card__button'>Заказать</button>
            </form>
          </Offcanvas.Body> :
          <EmptyStub loading={loading} text={orderCreated ? "Заказ успешно создан" : "В корзине ничего нет"} 
            img={orderCreated ? "Vector.png" : "Cart.png"}/>
        }
      </Offcanvas>
    </>
  );
})

export default PopupCart;
