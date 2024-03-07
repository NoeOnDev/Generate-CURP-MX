import styles from '../assets/styles/generateForm.module.css'

function GenerateCurpForm() {
    return (
        <div className={styles.container}>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default GenerateCurpForm;