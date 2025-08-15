import React, { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritoContext = createContext();

const FavoritoProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (producto) => {
    setFavoritos(prev => {
      // Evita duplicar
      if (prev.find(p => p.id === producto.id)) return prev;
      return [...prev, producto];
    });
  };

  const eliminarFavorito = (id) => {
    setFavoritos(prev => prev.filter(p => p.id !== id));
  };

  const estaEnFavoritos = (id) => {
    return favoritos.some(p => p.id === id);
  }

    const globalFavorito = { favoritos, 
    agregarFavorito, 
    eliminarFavorito, 
    estaEnFavoritos }

  return (
    <FavoritoContext.Provider value={globalFavorito}>
      {children}
    </FavoritoContext.Provider>
  );
};

export default FavoritoProvider
