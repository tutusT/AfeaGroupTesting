import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'

import { $fakeJson } from '../../https'

const ProductList = () => {
  const [productsData, setProductsData] = useState({})
  const [inputs, setInputs] = useState({
    price: '',
    rating: '',
    brand: '',
  })

  const [activeFilterInput, setActiveFilterInput] = useState('price')

  const handleChange = e => {
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    setActiveFilterInput(e.target.name)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await $fakeJson.get('https://dummyjson.com/products')
      setProductsData(data)
    })()
  }, [])

  const searchItems = (items, search) => {
    if (search.length === 0) {
      return items
    }

    return items.filter(item => {
      return (
        item?.[activeFilterInput]
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      )
    })
  }

  if (Object.keys(productsData).length === 0)
    return <div className='product-list__loading'>Loading</div>

  const renderItemValue = item => {
    return (
      <>
        <td className='table__item-value'>{item.title}</td>
        <td className='table__item-value'>{item.brand}</td>
        <td className='table__item-value'>{item.category}</td>
        <td className='table__item-value'>{item.description}</td>
        <td className='table__item-value'>{item.price}</td>
        <td className='table__item-value'>{item.rating}</td>
      </>
    )
  }

  return (
    <div className='product-list'>
      <div className='product-list__title'>
        <h1>Product list</h1>
      </div>
      <div className='product-list__filter-inputs'>
        <div className='product-list__filter-inputs-item filter-input'>
          <label>
            <span className='filter-input__label-value'>Price</span>
            <input
              name='price'
              type='text'
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='product-list__filter-inputs-item'>
          <label>
            <span className='filter-input__label-value'>Rating</span>
            <input
              name='rating'
              type='text'
              value={inputs.rating}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='product-list__filter-inputs-item'>
          <label>
            <span className='filter-input__label-value'>Brand</span>
            <input
              name='brand'
              type='text'
              value={inputs.brand}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className='product-list__body'>
        <Table
          columnTitles={[
            'title',
            'brand',
            'category',
            'description',
            'price',
            'rating',
          ]}
          renderItemValue={renderItemValue}
          data={searchItems(
            productsData?.products,
            inputs?.[activeFilterInput],
          )}
        />
      </div>
    </div>
  )
}

export default ProductList
