import { Offcanvas, Tab, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Stars from './Stars';
import useHttp from '../../hooks/useHttp';

export default function PopupInfo({ id, show, onHide }) {
    const { loading, request, error, clearError } = useHttp();
    const [infoProduct, setInfoProduct] = useState({});

    useEffect(() => {
        request(`http://test1.web-gu.ru/?action=show_product&id=${id}`).then(data => setInfoProduct(data));
        console.log(infoProduct);
        console.log(loading)
    }, [id])

    return (
        <>
            <Offcanvas className='popup-product' show={show} onHide={onHide} placement={'end'}>
                <Offcanvas.Header closeButton>
                    Информация
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <img className='mb-4 popup-product__img-large' src={infoProduct.img} alt="Фото товара" />
                    <div className='product-card__name'>{infoProduct.name}</div>
                    <div className='product-card__price'>{infoProduct.price} &nbsp;</div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="desc">
                        <div className='popup-tabs'>
                            <Nav className="flex popup-tabs__links">
                                <Nav.Link className='popup-tabs__link' eventKey="desc">Описание</Nav.Link>
                                <Nav.Link className='popup-tabs__link' eventKey="feature">Характеристики</Nav.Link>
                                <Nav.Link className='popup-tabs__link' eventKey="reviews">Отзывы</Nav.Link>
                                <Nav.Link className='popup-tabs__link' eventKey="feedback">Оставить отзыв</Nav.Link>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane className='popup-tabs__desc' eventKey="desc">
                                    {infoProduct.descr}
                                </Tab.Pane>
                                <Tab.Pane eventKey="feature">
                                    {infoProduct.props && Object.keys(infoProduct.props).map((prop, index) => {
                                        let { caption, value, measure } = infoProduct.props[prop];
                                        let style = "d-flex justify-content-between p-2";
                                        index++;
                                        if (index % 2 !== 0) style += ' popup-tabs__feature popup-tabs__feature_gray';

                                        return (
                                            <div className={style}>
                                                <div>{caption}</div>
                                                <div>{value} {measure}</div>
                                            </div>
                                        )
                                    })}
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews">
                                    {infoProduct.reviews && infoProduct.reviews.map(item => {
                                        let {author, avatar, rate, text} = item;
                                        return (
                                            <div className='popup-review'>
                                                <div className='me-2'>
                                                    <img src={avatar} />
                                                </div>
                                                <div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='popup-review__name'>{author}</div>
                                                        <Stars rate={rate}/>
                                                    </div>
                                                    <div className='popup-review__text'>{text}</div>
                                                </div>
                                            </div>)
                                    })}
                                </Tab.Pane>
                                <Tab.Pane className='popup-tabs__feedback' eventKey="feedback">
                                    <form className='form-popup mt-2'>
                                        <div>
                                            <div>
                                                Оценка
                                            </div>
                                            <Stars />
                                        </div>
                                        <div>
                                            <label className='w-100'>
                                                <div>
                                                    Имя
                                                </div>
                                                <input type='text' name='name' className='input-name' />
                                            </label>
                                        </div>
                                        <div className='mt-3'>
                                            <label className='w-100'>
                                                <div>
                                                    Отзыв
                                                </div>
                                                <textarea className='input-feedback' name='feedback' ></textarea>
                                            </label>
                                        </div>
                                        <button className='product-card__button'>Отправить отзыв</button>
                                    </form>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
