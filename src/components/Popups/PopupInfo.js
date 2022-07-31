import { Offcanvas, Tab, Nav } from 'react-bootstrap';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Stars from './Stars';
import useHttp from '../../hooks/useHttp';
import EmptyStub from '../EmptyStub';

const PopupInfo = ({ id, show, onHide }) => {
    const { loading, request, error, clearError } = useHttp();
    const [infoProduct, setInfoProduct] = useState({});
    const [formName, setFormName] = useState({ name: "", nameValid: true });
    const [formFeedback, setFormFeedback] = useState({ feedback: "", feedbackValid: true });
    const [formRate, setFormRate] = useState(0)

    useEffect(() => {
        request(`http://test1.web-gu.ru/?action=show_product&id=${id}`).then(data => setInfoProduct(data));
    }, [id]);

    function submitForm(event) {
        event.preventDefault();
        setFormName((prev) => ({ ...formName, nameValid: validInput(prev.name) }));
        setFormFeedback((prev) => ({ ...formFeedback, feedbackValid: validInput(prev.feedback) }));   
        if(formName.nameValid && formFeedback.feedbackValid){
            infoProduct.reviews.push({author : formName.name, avatar: "img/Avatar.png", rate: formRate, text: formFeedback.feedback});
            setInfoProduct(infoProduct);
            
            setFormRate(0);
        }
    }

    function validInput(value) {
        return value.length > 0;
    }

    function changeFormName(event) {
        setFormName({ 'name': event.target.value, 'nameValid': validInput(event.target.value) });
    }

    function changeFormFeedback(event) {
        setFormFeedback({ 'feedback': event.target.value, 'feedbackValid': validInput(event.target.value) });
    }

    return (
        <>
            <Offcanvas className='popup-product' show={show} onHide={onHide} placement={'end'}>
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
                                                <div className='me-2'>
                                                    <img src={avatar} />
                                                </div>
                                                <div style={{width: "100%"}}>
                                                    <div className='d-flex justify-content-between'>
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
                                        <div>
                                            <div>
                                                Оценка
                                            </div>
                                            <Stars rate={formRate} setRate={setFormRate} />
                                        </div>
                                        <div>
                                            <label className='w-100'>
                                                <div>
                                                    Имя
                                                </div>
                                                <input type='text' name='name' className='input-name'
                                                    value={formName.name} onChange={changeFormName} style={{ borderColor: !formName.nameValid && '#FF6969' }} />
                                                {!formName.nameValid && <div className='input_warning'>Имя не должно быть пустым</div>}    
                                            </label>
                                        </div>
                                        <div className='mt-3'>
                                            <label className='w-100'>
                                                <div>
                                                    Отзыв
                                                </div>
                                                <textarea className='input-feedback' name='feedback' 
                                                    defaultValue={formFeedback.feedback} onChange={changeFormFeedback} 
                                                    style={{ borderColor: !formFeedback.feedbackValid && '#FF6969' }}>      
                                                </textarea>
                                                {!formFeedback.feedbackValid && <div className='input_warning'>Отзыв не должен быть пустым</div>}
                                            </label>
                                        </div>
                                        <button className='product-card__button'>Отправить отзыв</button>
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
