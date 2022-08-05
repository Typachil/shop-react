import React, { useContext } from 'react';
import CategorySidebar from './CategorySidebar';
import ProductsPanel from './ProductsPanel';
import EmptyStub from './UIKit/EmptyStub';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
const Main = observer(() => {
    const { products } = useContext(Context);
    let productsArray = products.products.filter((item) => item.parent_id === products.currentType.id);

    return (
        <div className='main'>
            <CategorySidebar />
            {productsArray.length ?
                <ProductsPanel productsArray={productsArray} /> :
                <EmptyStub>
                    <img className='empty-stub__img' src='/img/Cart.png' alt="Cart"></img>
                    <div className='empty-stub__text'>В данной категории товаров пока нет</div>
                </EmptyStub>}
        </div>
    )
})

export default Main;
