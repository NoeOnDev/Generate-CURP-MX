import React from 'react';
import styles from '../assets/styles/generateForm.module.css'

function CurpGenerator({ curp }) {
    return (
        <div className={styles.spacer}>
            {curp && <p>CURP Generada:</p>}
            <p className={styles.curp}>{curp}</p>
        </div>
    );
}

export default CurpGenerator;