import React, { useEffect } from 'react';

import useFormState from './useFormState';
import PersonalInfoForm from './personalInfoForm';
import StateSelection from './stateSelection';
import AccessCodeInput from './accessCodeInput';
import styles from '../assets/styles/generateForm.module.css';

function GenerateCurpForm() {
    const {
        formData,
        curp,
        accessCode,
        inputCode,
        isValidCode,
        showMessage,
        showDownloadLink,
        usuarios,
        setUsuarios,
        handleClearForm,
        handleInputChange,
        handleGenderChange,
        handleCodeChange,
        handleSubmit,
        generatePDF
    } = useFormState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dia: '',
        mes: '',
        anio: '',
        genero: '',
        estado: ''
    });

    useEffect(() => {
        const savedUsuarios = localStorage.getItem('usuarios');
        if (savedUsuarios) {
            setUsuarios(JSON.parse(savedUsuarios));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }, [usuarios]);

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
                    <PersonalInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleGenderChange={handleGenderChange}
                    />

                    <StateSelection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    <AccessCodeInput
                        accessCode={accessCode}
                        inputCode={inputCode}
                        handleCodeChange={handleCodeChange}
                        isValidCode={isValidCode}
                        showMessage={showMessage}
                    />

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleClearForm}>Limpiar</button>
                        <button type="submit" className="btn btn-primary">Generar</button>
                    </div>
                </form>
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Género</th>
                            <th>Estado</th>
                            <th>CURP</th>
                            <th>Descargar PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidoPaterno}</td>
                                <td>{usuario.apellidoMaterno}</td>
                                <td>{`${usuario.dia}/${usuario.mes}/${usuario.anio}`}</td>
                                <td>{usuario.genero}</td>
                                <td>{usuario.estado}</td>
                                <td>{usuario.curp}</td>
                                <td>
                                    <button onClick={() => generatePDF(usuario)}>Descargar</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GenerateCurpForm;
