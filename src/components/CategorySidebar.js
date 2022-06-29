import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const CategorySidebar = observer(() => {
  const { products } = useContext(Context);
  let types = products.types.filter(item => item.parent_id == products.currentСategory.id);

  // useEffect(() => {
  //   products.setCurrentType(types[0]);
  //   console.log('Категория поменялась')
  // }, products.currentСategory)


  return (
    <div className='column-category'>
      {types.map((item) => {
        let { name, id } = item;
        let style = 'column-category__items';
        if (id == products.currentType.id) {
          style += ' column-category__items_active';
        }

        return (
          <div onClick={() => products.setCurrentType(item)} className={style} key={id}>{name}</div>
        )
      })}
    </div>
  )
})

export default CategorySidebar;
