import React, { useState } from 'react';
import styles from '../assets/styles/generateForm.module.css'

const estados = {
    "AGUASCALIENTES": "AS",
    "BAJA CALIFORNIA": "BC",
    "BAJA CALIFORNIA SUR": "BS",
    "CAMPECHE": "CC",
    "CHIAPAS": "CS",
    "CHIHUAHUA": "CH",
    "CIUDAD DE MEXICO": "DF",
    "COAHUILA": "CL",
    "COLIMA": "CM",
    "DURANGO": "DG",
    "ESTADO DE MEXICO": "MC",
    "GUANAJUATO": "GT",
    "GUERRERO": "GR",
    "HIDALGO": "HG",
    "JALISCO": "JC",
    "MICHOACAN": "MN",
    "MORELOS": "MS",
    "NAYARIT": "NT",
    "NUEVO LEON": "NL",
    "OAXACA": "OC",
    "PUEBLA": "PL",
    "QUERETARO": "QT",
    "QUINTANA ROO": "QR",
    "SAN LUIS POTOSI": "SP",
    "SINALOA": "SL",
    "SONORA": "SR",
    "TABASCO": "TC",
    "TAMAULIPAS": "TS",
    "TLAXCALA": "TL",
    "VERACRUZ": "VZ",
    "YUCATAN": "YN",
    "ZACATECAS": "ZS",
    "NACIDO EN EL EXTRANJERO": "NE"
};


function GenerateCurpForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        genero: '',
        estado: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleGenderChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            genero: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const curpData = generateCurp(formData);
        alert(`CURP Generada: ${curpData}`);
    };

    const generateCurp = ({ nombre, apellidos, fechaNacimiento, genero, estado }) => {
        const apellidosArray = apellidos.split(' ');
        const primerApellido = apellidosArray[0];
        const segundoApellido = apellidosArray.length > 1 ? apellidosArray[1] : '';
        
        const primerApellidoLetras = primerApellido.substr(0, 2).toUpperCase();
        const segundoApellidoLetra = segundoApellido.substr(0, 1).toUpperCase();
        const nombreLetra = nombre.substr(0, 1).toUpperCase();
        
        const fechaFormato = fechaNacimiento.split('-').slice(2).join('/');
        
        const generoLetra = genero === 'M' ? 'H' : 'M';
        const estadoCodigo = estados[estado.toUpperCase()] || 'NE';
        
        const primeraConsonanteInterna = (str) => {
            const match = str.substr(1).match(/[bcdfghjklmnpqrstvwxyz]/i);
            return match ? match[0].toUpperCase() : 'X';
        };
        
        const primerApellidoConsonanteInterna = primeraConsonanteInterna(primerApellido);
        const segundoApellidoConsonanteInterna = segundoApellido ? primeraConsonanteInterna(segundoApellido) : 'X';
        const nombreConsonanteInterna = primeraConsonanteInterna(nombre);
    
        return `${primerApellidoLetras}${segundoApellidoLetra}${nombreLetra}${fechaFormato}${generoLetra}${estadoCodigo}${primerApellidoConsonanteInterna}${segundoApellidoConsonanteInterna}${nombreConsonanteInterna}`;
    };
    
    return (
        <div className={styles.container}>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <img src="/spellbook.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    NoeOnCURP
                    </a>
                </div>
            </nav>
            <div className={styles.container2}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                        <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" id="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Género</label> <br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="genero" id="generoMale" value="M" checked={formData.genero === 'M'} onChange={handleGenderChange} />
                            <label className="form-check-label" htmlFor="genderMale">
                                Hombre
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="genero" id="generoFemale" value="F" checked={formData.genero === 'F'} onChange={handleGenderChange} />
                            <label className="form-check-label" htmlFor="genderFemale">
                                Mujer
                            </label>
                        </div>
                    </div>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default GenerateCurpForm;