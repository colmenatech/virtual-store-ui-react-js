import React, { useState } from 'react';
import './css/AddressForm.css';  // Importar la hoja de estilo

//Aquí se definen 
const STATES= [
{ code: 'Li', name: 'Limón' },
{ code: 'Pun', name: 'Puntarenas' },
{ code: 'Gua', name: 'Guanacaste' },
{ code: 'Sj', name: 'San José' },
{ code: 'Ala', name: 'Alajuela' },
{ code: 'Car', name: 'Cartago' },
{ code: 'Here', name: 'Heredia' }
];

const AddressForm = () => {
const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    state: '',
    direction: '',
    postalCode: '',
    references: '',
});

const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.lastname) newErrors.lastname = 'El apellido es requerido';
    if (!formData.address) newErrors.phone = 'El número de teléfono es requerido';
    if (!formData.city) newErrors.state = 'La provincia es requerida';
    if (!formData.state) newErrors.direction = 'La dirección es requerida';
    if (!formData.postalCode) {
    newErrors.postalCode = 'El código postal es requerido';
    } else if (!/^\d+$/.test(formData.postalCode)) {
    newErrors.postalCode = 'El código postal solo puede contener números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    console.log('Datos guardados', formData);
    alert('Datos guardados con éxito!');
    setFormData({
        name: '',
        lastname: '',
        phone: '',
        state: '',
        direction: '',
        postalCode: '',
        references: '',
    });
    }
};

return (
    <form onSubmit={handleSubmit} className="address-form">  
    <div className="form-group two-columns">
        <div>
        <label htmlFor="name">Nombre</label>
        <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
        <label htmlFor="lastname">Apellidos</label>
        <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
        />
        {errors.lastname && <span className="error-message">{errors.lastname}</span>}
        </div>
    </div>

    <div>
        <label htmlFor="phone">Teléfono:</label>
        <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
    </div>

    <div>
        <label htmlFor="state">Provincia:</label>
        <select
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        >
        <option value="">Seleccione una provincia</option>
        {STATES.map((state) => (
            <option key={state.code} value={state.name}>
            {state.name}
            </option>
        ))}
        </select>
        {errors.state && <p className="error-message">{errors.state}</p>}
    </div>

    <div>
        <label htmlFor="direction">Dirección:</label>
        <input
        type="text"
        id="direction"
        name="direction"
        value={formData.direction}
        onChange={handleChange}
        />
        {errors.direction && <p className="error-message">{errors.direction}</p>}
    </div>
    
    <div>
        <label htmlFor="postalCode">Código Postal:</label>
        <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        />
        {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
    </div>

    <div className="form-group full-width">
        <label htmlFor="references">Referencias</label>
        <input
        type="text"
        id="references"
        name="references"
        value={formData.references}
        onChange={handleChange}
        placeholder="apartamento, suite, unidad, edificio, piso, etc. (opcional)"
        />
    </div>
    <button type="submit">Guardar</button>
    <button type= "submit">Proceder a pagar</button>
    </form>
);

};

export default AddressForm;
