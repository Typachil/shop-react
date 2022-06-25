import React from 'react'

export default function EmptyStub({text}) {
    return (
        <div className='empty-stub'>
            <div className='empty-stub__wrapper'>
                <img className='empty-stub__img' src="/img/Cart.png"></img>
                <div className='empty-stub__text'>{text}</div>
            </div>
        </div>
    )
}
