import { Offcanvas, Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import EmptyStub from '../UIKit/EmptyStub';
import useHttp from '../../hooks/useHttp';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import useInput from '../../hooks/useInput';
import Input from '../UIKit/Input';
import Button from '../UIKit/Button';

const PopupCart = observer(({ show, onHide }) => {
    const { loading, request } = useHttp();
    const { products } = useContext(Context);
    const [orderCreated, setOrderCreated] = useState(false);
    const formName = useInput('', { isEmpty: true });
    const formTel = useInput('', { isEmpty: true, isTel: true });
    const formAddress = useInput('', { isEmpty: true });

    function submitForm(event) {
        event.preventDefault();
        formName.onBlur();
        formTel.onBlur();
        formAddress.onBlur();

        if (formName.inputValid && formTel.inputValid && formAddress.inputValid) {
            products.setCart([]);
            request('http://test1.web-gu.ru/?action=send_form').then((data) => {
                setOrderCreated(data.result);
                if (data.result) localStorage.clear();
                formName.clearValue();
                formTel.clearValue();
                formAddress.clearValue();
            });
        }
    }

    function deleteProductFromCart(id) {
        products.deleteCart(id);
        localStorage.setItem('Cart', JSON.stringify(products.cart));
    }

    return (
        <>
            <Offcanvas
                onExiting={() => setOrderCreated(false)}
                className='popup-product'
                show={show}
                onHide={onHide}
                placement={'end'}>
                <Offcanvas.Header closeButton>Оформить заказ</Offcanvas.Header>
                {products.cart.length ? (
                    <Offcanvas.Body>
                        В корзине:
                        <div className='popup-product__items'>
                            {products.cart.map((item) => {
                                let { id, name, price, img } = item;
                                return (
                                    <div className='popup-product__item' key={id}>
                                        <img src={img} alt='Фото товара' />
                                        <div className='popup-product__description'>
                                            <div className='product-card__name'>{name}</div>
                                            <div className='product-card__price'>{price} &nbsp;</div>
                                            <Button
                                                classes={'popup-product__button'}
                                                onClick={() => deleteProductFromCart(id)}>
                                                Убрать из корзины
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <form className='form-popup' onSubmit={submitForm}>
                            <Row>
                                <Col className='mt-3' sm={12} md={6}>
                                    <label className='w-100'>
                                        <div>Имя</div>
                                        <Input name='name' type='text' useInputData={formName} />
                                        {formName.isEmpty && formName.isDirty && (
                                            <div className='label-warning'>Имя не должно быть пустым</div>
                                        )}
                                    </label>
                                </Col>
                                <Col className='mt-3' sm={12} md={6}>
                                    <label className='w-100'>
                                        <div>Телефон</div>
                                        <Input name='tel' type='tel' useInputData={formTel} />
                                        {formTel.telError && formTel.isDirty && (
                                            <div className='label-warning'>Телефон должен быть корректным</div>
                                        )}
                                    </label>
                                </Col>
                                <Col xs={12}>
                                    <label className='label-address'>
                                        <div>Полный адрес</div>
                                        <Input name='address' type='text' useInputData={formAddress} />
                                        {formAddress.isEmpty && formTel.isDirty && (
                                            <div className='label-warning'>Адрес не должен быть пустым</div>
                                        )}
                                    </label>
                                </Col>
                            </Row>
                            <Button classes={'product-card__button'}>Заказать</Button>
                        </form>
                    </Offcanvas.Body>
                ) : (
                    <EmptyStub loading={loading}>
                        <img
                            className='empty-stub__img'
                            src={orderCreated ? 'img/Vector.png' : 'img/Cart.png'}
                            alt='stub'></img>
                        <div className='empty-stub__text'>
                            {orderCreated ? 'Заказ успешно создан' : 'В корзине ничего нет'}{' '}
                        </div>
                    </EmptyStub>
                )}
            </Offcanvas>
        </>
    );
});

export default PopupCart;
