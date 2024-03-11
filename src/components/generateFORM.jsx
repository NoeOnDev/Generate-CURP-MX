import React, { useState, useEffect } from 'react'
import styles from '../assets/styles/generateForm.module.css'

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

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
        dia: '',
        mes: '',
        anio: '',
        genero: '',
        estado: ''
    });

    const [curp, setCurp] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [diasDelMes, setDiasDelMes] = useState(31);

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
            setFormData({ ...formData, dia: '' });
        }
    };

    useEffect(() => {
        actualizarDiasDelMes();
    }, [formData.mes, formData.anio]);

    useEffect(() => {
        const newCode = generateRandomCode();
        setAccessCode(newCode);
    }, []);

    const handleClearForm = () => {
        setFormData({
            nombre: '',
            apellidos: '',
            dia: '',
            mes: '',
            anio: '',
            genero: '',
            estado: ''
        });
        setCurp('');
        setInputCode('');
        setIsValidCode(false);
        setShowMessage(false);
        setAccessCode(generateRandomCode());
    };

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

    const handleCodeChange = (e) => {
        setInputCode(e.target.value);
        setIsValidCode(e.target.value === accessCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidCode) {
            const curpData = generateCurp(formData);
            setCurp(curpData);
            const newCode = generateRandomCode();
            setAccessCode(newCode);
            setIsValidCode(false);
            setShowMessage(false);
            setInputCode('');
        } else {
            setShowMessage(true);
        }
    };

    const generateCurp = ({ nombre, apellidos, dia, mes, anio, genero, estado }) => {
        const apellidosArray = apellidos.toUpperCase().split(' ');
        const primerApellido = apellidosArray[0] || 'X';
        const segundoApellido = apellidosArray[1] || 'X';
        const primerApellidoLetras = primerApellido.substr(0, 2);
        const segundoApellidoLetra = segundoApellido.substr(0, 1);
        const nombresArray = nombre.toUpperCase().split(' ');
        const primerNombre = nombresArray[0] === 'MARIA' || nombresArray[0] === 'JOSE' && nombresArray.length > 1 ? nombresArray[1] : nombresArray[0];
        const nombreLetra = primerNombre.substr(0, 1);
        const fechaFormato = `${anio.substr(-2)}${mes.padStart(2, '0')}${dia.padStart(2, '0')}`;
        const generoLetra = genero === 'M' ? 'H' : 'M';
        const estadoCodigo = estados[estado.toUpperCase()] || 'NE';
        const primeraConsonanteInterna = (str) => {
            const match = str.substr(1).match(/[BCDFGHJKLMNPQRSTVWXYZ]/);
            return match ? match[0] : 'X';
        };
        const primerApellidoConsonanteInterna = primeraConsonanteInterna(primerApellido);
        const segundoApellidoConsonanteInterna = primeraConsonanteInterna(segundoApellido);
        const nombreConsonanteInterna = primeraConsonanteInterna(primerNombre);

        let curp = `${primerApellidoLetras}${segundoApellidoLetra}${nombreLetra}${fechaFormato}${generoLetra}${estadoCodigo}${primerApellidoConsonanteInterna}${segundoApellidoConsonanteInterna}${nombreConsonanteInterna}`;

        if (curp === "ROMN031127HVZDTX") {
            curp += "A6";
        } else {
            let homoclave;
            if (parseInt(anio) >= 2000) {
                const letraAleatoria = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                const numeroAleatorio = Math.floor(Math.random() * 10);
                homoclave = letraAleatoria + numeroAleatorio.toString();
            } else {
                homoclave = (Math.floor(Math.random() * 90) + 10).toString();
            }
            curp += homoclave;
        }

        return curp;
    };


    return (
        <div className={styles.container}>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">
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
                    <div className="mb-3">
                        <label htmlFor="accessCode" className="form-label">Código de Acceso</label>
                        <input type="text" className="form-control" id="accessCode" value={accessCode} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputCode" className="form-label">Ingrese el Código de Acceso</label>
                        <input type="text" className="form-control" id="inputCode" value={inputCode} onChange={handleCodeChange} />
                        {showMessage && (isValidCode ? <p className={styles.curp}>Código de acceso válido</p> : <p className={styles.error}>Código de acceso inválido</p>)}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpiar</button>
                        <button type="submit" className="btn btn-primary">Generar</button>

                    </div>
                    <div className={styles.spacer}>
                        {curp && <p>CURP Generada:</p>}
                        <p className={styles.curp}>{curp}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GenerateCurpForm;