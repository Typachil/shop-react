import { Offcanvas, Tab, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Stars from '../UIKit/Stars';
import useHttp from '../../hooks/useHttp';
import EmptyStub from '../UIKit/EmptyStub';
import useInput from '../../hooks/useInput';
import Input from '../UIKit/Input';
import Button from '../UIKit/Button';

const PopupInfo = ({ id, show, onHide }) => {
    const { loading, request } = useHttp();
    const [infoProduct, setInfoProduct] = useState({});
    const [formRate, setFormRate] = useState(0);
    const name = useInput('', { isEmpty: true });
    const feedback = useInput('', { isEmpty: true, minLength: 5 })

    useEffect(() => {
        request(`http://test1.web-gu.ru/?action=show_product&id=${id}`).then(data => setInfoProduct(data));
    }, [id, request]);

    function submitForm(event) {
        event.preventDefault();
        name.onBlur();
        feedback.onBlur();

        if (name.inputValid && feedback.inputValid) {
            infoProduct.reviews.push({ author: name.value, avatar: "img/Avatar.png", rate: formRate, text: feedback.value });
            setInfoProduct(infoProduct);

            name.clearValue();
            feedback.clearValue();
            setFormRate(0);
        }
    }

    return (
        <>
            <Offcanvas className='popup-product' show={show} onHide={() => onHide(false)} placement={'end'}>
                <Offcanvas.Header closeButton>
                    Информация
                </Offcanvas.Header>
                {!loading ? <Offcanvas.Body>
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
                                            <div key={index} className={style}>
                                                <div>{caption}</div>
                                                <div>{value} {measure}</div>
                                            </div>
                                        )
                                    })}
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews">
                                    {infoProduct.reviews && infoProduct.reviews.map((item, index) => {
                                        let { author, avatar, rate, text } = item;
                                        return (
                                            <div className='popup-review' key={index}>
                                                <div className='me-2 popup-review__avatar'>
                                                    <img src={avatar} alt='avatar' />
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div className='popup-review__block-top'>
                                                        <div className='popup-review__name'>{author}</div>
                                                        <Stars rate={rate} />
                                                    </div>
                                                    <div className='popup-review__text'>{text}</div>
                                                </div>
                                            </div>)
                                    })}
                                </Tab.Pane>
                                <Tab.Pane className='popup-tabs__feedback' eventKey="feedback">
                                    <form className='form-popup mt-2' onSubmit={submitForm}>
                                        <div className='mb-3'>
                                            <div className='mb-2'>Оценка</div>
                                            <Stars rate={formRate} setRate={setFormRate} />
                                        </div>
                                        <div>
                                            <label className='w-100'>
                                                <div>Имя</div>
                                                <Input name='name' type='text' useInputData={name} />
                                                {name.isDirty && name.isEmpty && <div className='label-warning'>Имя не должно быть пустым</div>}
                                            </label>
                                        </div>
                                        <div className='mt-3'>
                                            <label className='w-100'>
                                                <div>Отзыв</div>
                                                <textarea className='input-feedback' name='feedback'
                                                    value={feedback.value}
                                                    onBlur={e => feedback.onBlur(e)}
                                                    onChange={e => feedback.onChange(e)}
                                                    style={{ borderColor: feedback.isDirty && !feedback.inputValid && '#FF6969' }}>
                                                </textarea>
                                                {feedback.isDirty && feedback.isEmpty && <div className='label-warning'>Отзыв не должен быть пустым</div>}
                                                {feedback.isDirty && feedback.minLengthError && <div className='label-warning'>Отзыв должен содержать больше 5 символов</div>}
                                            </label>
                                        </div>
                                        <Button classes={'product-card__button'}>Отправить отзыв</Button>
                                    </form>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </Offcanvas.Body> : <EmptyStub loading={loading} />}
            </Offcanvas>
        </>
    )
};

export default PopupInfo;
