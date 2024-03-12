import React from 'react';
import styles from '../assets/styles/generateForm.module.css'

function CurpGenerator({ curp, nombre, apellidoPaterno, apellidoMaterno, dia, mes, anio, genero, estado, handleSubmit }) {
    const fechaNacimiento = `${dia}/${mes}/${anio}`;
    return (
        <div className={styles.spacer}>
            {curp && 
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Nombre completo</th>
                            <td>{`${nombre} ${apellidoPaterno} ${apellidoMaterno}`}</td>
                        </tr>
                        <tr>
                            <th>Fecha de nacimiento</th>
                            <td>{fechaNacimiento}</td>
                        </tr>
                        <tr>
                            <th>Género</th>
                            <td>{genero}</td>
                        </tr>
                        <tr>
                            <th>Estado</th>
                            <td>{estado}</td>
                        </tr>
                        <tr>
                            <th>CURP</th>
                            <td>{curp}</td>
                        </tr>
                        <tr>
                            <th>Descargar PDF</th>
                            <td><a href='' onClick={handleSubmit}>Descargar CURP en PDF</a></td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    );
}

export default CurpGenerator;