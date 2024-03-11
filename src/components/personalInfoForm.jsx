import React, { useEffect } from 'react';

function PersonalInfoForm({ formData, handleInputChange, handleGenderChange }) {
    const [diasDelMes, setDiasDelMes] = React.useState(31);
    const actualizarDiasDelMes = () => {
        const mes = parseInt(formData.mes, 10);
        const anio = parseInt(formData.anio, 10);
        let dias = 31;
    
        if (mes === 2) {
            if (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) {
                dias = 29;
            } else {
                dias = 28;
            }
        } else if ([4, 6, 9, 11].includes(mes)) {
            dias = 30;
        }
    
        setDiasDelMes(dias);
    
        if (parseInt(formData.dia, 10) > dias) {
            handleInputChange({ target: { id: 'dia', value: '' } });
        }
    };
    
    useEffect(() => {
        actualizarDiasDelMes();
    }, [formData.mes, formData.anio]);


    return (
        <div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de nacimiento</label>
                <div className="row">
                    <div className="col">
                        <select className="form-select" id="dia" value={formData.dia} onChange={handleInputChange}>
                            <option value="">Día</option>
                            {[...Array(diasDelMes)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>

                    </div>
                    <div className="col">
                        <select className="form-select" id="mes" value={formData.mes} onChange={handleInputChange}>
                            <option value="">Mes</option>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" id="anio" value={formData.anio} onChange={handleInputChange}>
                            <option value="">Año</option>
                            {[...Array(101)].map((_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Género</label> <br />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genero" id="generoMale" value="M" checked={formData.genero === 'M'} onChange={handleGenderChange} />
                    <label className="form-check-label" htmlFor="generoMale">
                        Hombre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="genero" id="generoFemale" value="F" checked={formData.genero === 'F'} onChange={handleGenderChange} />
                    <label className="form-check-label" htmlFor="generoFemale">
                        Mujer
                    </label>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoForm;