import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ProductsList = (props) => {
  const { all, show } = props.product;
  const renderProducts = () => {
    return all.map(product => {
      return (
        /* When using list you need to specify a key
         * attribute that is unique for each list item
        */
        <li
          onClick={() => show(product)}
          key={product.id} >
          <strong>{ product.title }</strong> - { product.description }
        </li>
      );
    })
  }

  return <ul>{renderProducts()}</ul>;
}

export default ProductsList;
