import React from 'react';
import styles from '../assets/styles/generateForm.module.css'

function AccessCodeInput({ accessCode, inputCode, handleCodeChange, isValidCode, showMessage }) {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="accessCode" className="form-label">Código de Acceso</label>
                <input type="text" className="form-control" id="accessCode" value={accessCode} readOnly />
            </div>
            <div className="mb-3">
                <label htmlFor="inputCode" className="form-label">Ingrese el Código de Acceso</label>
                <input type="text" className="form-control" id="inputCode" value={inputCode} onChange={handleCodeChange} />
                {showMessage && (isValidCode ? <p className={styles.curp}>Código de acceso válido</p> : <p className={styles.error}>Código de acceso inválido</p>)}
            </div>
        </div>

    );
}

export default AccessCodeInput;
