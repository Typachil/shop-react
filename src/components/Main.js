import React, { useContext, useEffect } from 'react';
import CategorySidebar from './CategorySidebar';
import ProductsPanel from './ProductsPanel';
import EmptyStub from './EmptyStub';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {
    const {products} = useContext(Context);
    let productsArray = products.products.filter((item) => item.parent_id === products.currentType.id);

    return (
        <div className='main'>
            <CategorySidebar />
            {productsArray.length ? 
            <ProductsPanel productsArray={productsArray} /> : 
            <EmptyStub text={"В данной категории товаров пока нет"} img={"Cart.png"}/>}
        </div>
    )
})

export default Main;
