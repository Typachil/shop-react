import { Offcanvas, Tab, Nav } from 'react-bootstrap';
import React from 'react'
import Stars from './Stars';

export default function PopupInfo({ show, onHide }) {
    return (
        <>
            <Offcanvas className='popup-product' show={show} onHide={onHide} placement={'end'}>
                <Offcanvas.Header closeButton>
                    Информация
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <img className='mb-4' src="img/Chair_info.png" alt="Фото товара" />
                    <div className='product-card__name'>Стул рабочий</div>
                    <div className='product-card__price'>6 000 &nbsp;</div>
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
                                    VIKING A3 - удобное кресло, которое станет удачным выбором для домашнего использования и для офиса. Кресло выдерживает нагрузку до 181 кг. Высота сиденья регулируется при помощи надежного механизма. Спинка качается, при желании ее можно прочно зафиксировать в вертикальном положении. Эргономичная конструкция помогает снизить нагрузку на мышцы и уменьшить усталость от долгой работы за компьютером. Кресло закреплено на прочной и устойчивой
                                </Tab.Pane>
                                <Tab.Pane eventKey="feature">
                                    <div className='d-flex justify-content-between p-2 popup-tabs__feature popup-tabs__feature_gray'>
                                        <div>Высота</div>
                                        <div>50 мм</div>
                                    </div>
                                    <div className='d-flex justify-content-between p-2'>
                                        <div>Ширина</div>
                                        <div>60 мм</div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews">
                                    <div className='popup-review'>
                                        <div className='me-2'>
                                            <img src='img/Avatar.png' />
                                        </div>
                                        <div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='popup-review__name'>Олег Олегов</div>
                                                <Stars/>
                                            </div>
                                            <div className='popup-review__text'>Он подходит именно для питья, для утоления жажды. Этот квас сильногазированный. После вскрытия бутылки газ сохраняется в ней в течении суток. Квас сладкий, послевкусие придаёт небольшую кислинку. Квас тёмного цвета.</div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane className='popup-tabs__feedback' eventKey="feedback">
                                    <form className='form-popup mt-2'>
                                        <div>
                                            <div>
                                                Оценка
                                            </div>
                                            <Stars/>
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
                                                {/* <input type='text' name='feedback' className='input-feedback' /> */}
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
