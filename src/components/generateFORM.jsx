import styles from '../assets/styles/generateForm.module.css'

function GenerateCurpForm() {
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
                        <label className="form-label">Género</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="genderMale" value="M" />
                            <label className="form-check-label" htmlFor="genderMale">
                                Hombre
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="F" />
                            <label className="form-check-label" htmlFor="genderFemale">
                                Mujer
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default GenerateCurpForm;