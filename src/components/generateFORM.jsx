import React, { useState } from 'react';
import styles from '../assets/styles/generateForm.module.css'

function GenerateCurpForm() {
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        birthdate: '',
        gender: '',
        state: ''
    });
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
                <form className={styles.form}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nombre(s)</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Apellidos</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                        <div id="passwordHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthdate" className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" id="birthdate" />
                        <div id="birthdateHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Género</label> <br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="genderMale" value="M" />
                            <label className="form-check-label" htmlFor="genderMale">
                                Hombre
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="F" />
                            <label className="form-check-label" htmlFor="genderFemale">
                                Mujer
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">Estado</label>
                        <select className="form-select" id="state">
                            <option selected>Selecciona tu estado</option>
                            <option value="AGUASCALIENTES">AGUASCALIENTES</option>
                            <option value="BAJA CALIFORNIA">BAJA CALIFORNIA</option>
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