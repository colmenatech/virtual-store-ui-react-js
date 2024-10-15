import React from 'react';
import AddressForm from './AddressForm';

const App = () => {
  return (
    <div>
      <h1 
  style={{ 
    color: '#000000', 
    textAlign: 'center', 
    fontSize: '27px', 
    marginBottom: '20px' ,
    fontFamily: 'Times New Roman, serif'
  }}
>
  Formulario de Dirección
</h1>

      <AddressForm />
    </div>
  );
};

export default App;
