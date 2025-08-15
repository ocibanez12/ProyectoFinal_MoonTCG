import React, { createContext, useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { productos } from '../components/productos'

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulación de fetch de datos
    setTimeout(() => {
      setProducts(productos);
      setLogo("https://i.postimg.cc/5t2JfFDk/Logo.png");
      setLoading(false);
    }, 1000);
  }, []);

  const addProduct = (nuevoProducto) => {
    setProducts((prev) => [...prev, nuevoProducto]);
  };

  const updateProduct = (productoEditado) => {
  setProducts((prev) =>
    prev.map((prod) => 
      prod.id === productoEditado.id ? { ...prod, ...productoEditado } : prod
    )
  );
  };


  const removeProduct = (id) => {
    setProducts((prev) => prev.filter(prod => prod.id !== id));
  };

  const globalProduct = {
    logo, 
    products, 
    addProduct, 
    removeProduct,
    updateProduct 
  }

  return (
    <ProductContext.Provider value={globalProduct}>
      {loading ? (
        <div className="loading-container">
          <SyncLoader margin={3} size={40} speedMultiplier={0.7} color="#ececec" />
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
