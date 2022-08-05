import React from 'react'
import { Spinner } from 'react-bootstrap'

/**
 * Компонент EmptyStub является универсальной заглушкой, когда товаров нет в корзине 
 * или когда пользователь оформил заказ
 */
export default function EmptyStub({ loading, children }) {
    return (
        <div className='empty-stub'>
            <div className='empty-stub__wrapper'>
                {loading ? <Spinner animation="border" /> :
                    children
                }
            </div>
        </div>
    )
}
