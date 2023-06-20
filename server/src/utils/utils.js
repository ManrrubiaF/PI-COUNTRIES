const getPngUrl = (urls) => {
  if (typeof urls === 'object' && urls.png) {
    return urls.png;
  }
  return null; // Si no se encuentra la URL de la bandera en formato PNG o urls no es un objeto, se devuelve null
};


  
  module.exports = {
    getPngUrl,
  };
  