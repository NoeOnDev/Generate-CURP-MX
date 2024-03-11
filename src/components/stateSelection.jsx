import React from 'react';

function StateSelection({ formData, handleInputChange }) {
    return (
        <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <select className="form-select" id="estado" value={formData.estado} onChange={handleInputChange}>
                <option value="">Selecciona tu estado</option>
                <option value="AGUASCALIENTES">AGUASCALIENTES</option>
                <option value="BAJA CALIFORNIA SUR">BAJA CALIFORNIA SUR</option>
                <option value="CAMPECHE">CAMPECHE</option>
                <option value="CHIAPAS">CHIAPAS</option>
                <option value="CHIHUAHUA">CHIHUAHUA</option>
                <option value="CIUDAD DE MEXICO">CIUDAD DE MEXICO</option>
                <option value="COAHUILA">COAHUILA</option>
                <option value="COLIMA">COLIMA</option>
                <option value="DURANGO">DURANGO</option>
                <option value="ESTADO DE MEXICO">ESTADO DE MEXICO</option>
                <option value="GUANAJUATO">GUANAJUATO</option>
                <option value="GUERRERO">GUERRERO</option>
                <option value="HIDALGO">HIDALGO</option>
                <option value="JALISCO">JALISCO</option>
                <option value="MICHOACAN">MICHOACAN</option>
                <option value="MORELOS">MORELOS</option>
                <option value="NAYARIT">NAYARIT</option>
                <option value="NUEVO LEON">NUEVO LEON</option>
                <option value="OAXACA">OAXACA</option>
                <option value="PUEBLA">PUEBLA</option>
                <option value="QUERETARO">QUERETARO</option>
                <option value="QUINTANA ROO">QUINTANA ROO</option>
                <option value="SAN LUIS POTOSI">SAN LUIS POTOSI</option>
                <option value="SINALOA">SINALOA</option>
                <option value="SONORA">SONORA</option>
                <option value="TABASCO">TABASCO</option>
                <option value="TAMAULIPAS">TAMAULIPAS</option>
                <option value="TLAXCALA">TLAXCALA</option>
                <option value="VERACRUZ">VERACRUZ</option>
                <option value="YUCATAN">YUCATAN</option>
                <option value="ZACATECAS">ZACATECAS</option>
            </select>
        </div>
    );
}

export default StateSelection;
