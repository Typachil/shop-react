import React from 'react'
import { Spinner } from 'react-bootstrap'

/**
 * Компонент EmptyStub является универсальной заглушкой, когда товаров нет в корзине 
 * или когда пользователь оформил заказ
 */
export default function EmptyStub({ text, img, loading }) {
    return (
        <div className='empty-stub'>
            <div className='empty-stub__wrapper'>
                {loading ? <Spinner animation="border" /> :
                    <>
                        <img className='empty-stub__img' src={`/img/${img}`}></img>
                        <div className='empty-stub__text'>{text}</div>
                    </>
                }
            </div>
        </div>
    )
}
