import React from 'react';
import CategorySidebar from './CategorySidebar';
import ProductsPanel from './ProductsPanel';
import EmptyStub from './EmptyStub';

export default function Main() {
    return (
        <div className='main'>
            <CategorySidebar />
            <ProductsPanel />
            {/* <EmptyStub /> */}
        </div>
    )
}
