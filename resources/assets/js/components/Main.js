import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Product from './Product';
import ProductsList from './ProductsList';
import AddProduct from './AddProduct';
const Context = React.createContext();

class Provider extends Component {
  constructor() {
    super();
    this.state = {
      product: {
        all: [],
        show: (product) => {
          this.setState({
            product: Object.assign({}, this.state.product, { currentProduct: product })
          })
        },
        create: (product) => {
          this.setState({
            product: Object.assign({},
              this.state.product, {
                currentProduct: product,
                all: this.state.product.all.concat(product),
              }
            )
          })
        },
        update: null,
        delete: null,
        currentProduct: null,
      },
    }
  }

  componentWillMount() {
    axios.get('/api/products')
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: Object.assign({}, this.state.product, { all: response.data })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Products = () => {
  return (
    <div>
      <h3> All products </h3>
      <Context.Consumer>
        {(context) => (
          <div>
            <ProductsList product={context.product} />
            <Product product={context.product.currentProduct} />
            <AddProduct product={context.product} />
          </div>
        )}
      </Context.Consumer>
    </div>
  );
}

class Main extends Component {
  render() {
    return (
      <Provider>
        <Products />
      </Provider>
    )
  }
}

export default Main;

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}
