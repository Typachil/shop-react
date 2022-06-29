import { Offcanvas, Row, Col } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import EmptyStub from '../EmptyStub';
import useHttp from '../../hooks/useHttp';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const PopupCart = observer(({ show, onHide}) => {
  const { loading, request, error, clearError } = useHttp();
  const {products} = useContext(Context);
  const [formName, setFormName] = useState({name : "", tel: "", address: ""});
  const [formTel, setFormTel] = useState({name : "", tel: "", address: ""});
  const [formAddress, setFormAddress] = useState({name : "", tel: "", address: ""});

  function submitForm(event){
    event.preventDefault(); 
    request('http://test1.web-gu.ru/?action=send_form').then(data => console.log(data));
    console.log(loading);
  }

  function changeFormValue(event) {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  function deleteProductFromCart(id){
    products.deleteCart(id);
    localStorage.setItem('Cart', JSON.stringify(products.cart));
  }

  return (
    <>
      <Offcanvas className='popup-product' show={show} onHide={onHide} placement={'end'}>
        <Offcanvas.Header closeButton>
          Оформить заказ
        </Offcanvas.Header>
        {products.cart.length ? <Offcanvas.Body>
          В корзине:
          <div className='popup-product__items'>
            {products.cart.map((item) => {
              let {id, name, price, img} = item;
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
              <Col xs={6}>
                <label>
                  <div>Имя</div>
                  <input type='text' name='name' className='input-name' value={formValue.name} onChange={changeFormValue}/>
                </label>
              </Col>
              <Col xs={6}>
                <label>
                  <div>Телефон</div>
                  <input type='tel' name='tel' className='input-tel' value={formValue.tel} onChange={changeFormValue}/>
                </label>
              </Col>
              <Col xs={12}>
                <label className='label-address'>
                  <div>Полный адрес</div>
                  <input type='text' name='address' className='input-address' value={formValue.address} onChange={changeFormValue}/>
                </label>
              </Col>
            </Row>
            <button className='product-card__button'>Заказать</button>
          </form>
        </Offcanvas.Body> :
        <EmptyStub text={"В корзине ничего нет"}/>
        }
        {/* <div className='empty-stub'>
            <div className='empty-stub__wrapper'>
                <img src="/img/Vector.png"></img>
                <div className='empty-stub__text'>Заказ успешно создан</div>
            </div>
        </div> */}
      </Offcanvas>
    </>
  );
})

export default PopupCart;
