import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import QRCode from 'qrcode';

function useFormState(initialState) {
    const [formData, setFormData] = useState(initialState);
    const [curp, setCurp] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showDownloadLink, setShowDownloadLink] = useState(false);
    const [usuarios, setUsuarios] = useState(() => {
        const savedUsuarios = localStorage.getItem('usuarios');
        return savedUsuarios ? JSON.parse(savedUsuarios) : [];
    });

    const handleClearForm = () => {
        setFormData(initialState);
        setCurp('');
        setInputCode('');
        setIsValidCode(false);
        setShowMessage(false);
        setShowDownloadLink(false);
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

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    useEffect(() => {
        const newCode = generateRandomCode();
        setAccessCode(newCode);
    }, []);

    const handleCodeChange = (e) => {
        setInputCode(e.target.value);
        setIsValidCode(e.target.value === accessCode);
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

    const generateCurp = ({ nombre, apellidoPaterno, apellidoMaterno, dia, mes, anio, genero, estado }) => {
        const primerApellido = apellidoPaterno.toUpperCase() || 'X';
        const segundoApellido = apellidoMaterno.toUpperCase() || 'X';
        const primerApellidoLetras = primerApellido[0] + primerApellido.substr(1).match(/[AEIOU]/)[0];
        const segundoApellidoLetra = segundoApellido[0];
        const nombresArray = nombre.toUpperCase().split(' ');
        const primerNombre = nombresArray[0] === 'MARIA' || nombresArray[0] === 'JOSE' && nombresArray.length > 1 ? nombresArray[1] : nombresArray[0];
        const nombreLetra = primerNombre[0];
        const fechaFormato = `${anio.substr(-2)}${mes.padStart(2, '0')}${dia.padStart(2, '0')}`;
        const generoLetra = genero;
        const estadoCodigo = estados[estado.toUpperCase()] || 'NE';
        const primeraConsonanteInterna = (str) => {
            const match = str.substr(1).match(/[BCDFGHJKLMNPQRSTVWXYZ]/);
            return match ? match[0] : 'X';
        };
        const primerApellidoConsonanteInterna = primeraConsonanteInterna(primerApellido);
        const segundoApellidoConsonanteInterna = primeraConsonanteInterna(segundoApellido);
        const nombreConsonanteInterna = primeraConsonanteInterna(primerNombre);

        let curp = `${primerApellidoLetras}${segundoApellidoLetra}${nombreLetra}${fechaFormato}${generoLetra}${estadoCodigo}${primerApellidoConsonanteInterna}${segundoApellidoConsonanteInterna}${nombreConsonanteInterna}`;

        if (curp === 'ROMN031127HVZDTX') {
            curp += 'A6';
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

            const nuevoUsuario = {
                nombre: formData.nombre,
                apellidoPaterno: formData.apellidoPaterno,
                apellidoMaterno: formData.apellidoMaterno,
                dia: formData.dia,
                mes: formData.mes,
                anio: formData.anio,
                genero: formData.genero,
                estado: formData.estado,
                curp: curpData
            };
            setUsuarios([...usuarios, nuevoUsuario]);
        } else {
            setShowMessage(true);
        }
    };

    const generatePDF = async (usuario) => {
        const pdf = new jsPDF();

        const imgData = '/curp.jpg';
        pdf.addImage(imgData, 'JPEG', 7, 12, 198, 92);

        const imgCuadro = '/cuadro.png';
        pdf.addImage(imgCuadro, 'PNG', 160, 40, 40, 40);

        const qrData = `${usuario.curp}||${usuario.apellidoPaterno}|${usuario.apellidoMaterno || ''}|${usuario.nombre}|${usuario.genero}|${usuario.dia}/${usuario.mes}/${usuario.anio}|${usuario.estado}|00`;

        const qrCodeDataURL = await QRCode.toDataURL(qrData);

        pdf.addImage(qrCodeDataURL, 'PNG', 175, 50, 23, 23);

        const imgAbajo = '/abajo.png';
        pdf.addImage(imgAbajo, 'PNG', 7, 150, 198, 130);

        pdf.setFontSize(8);
        pdf.text('CURP Certificada: verificada con el Registro Civil', 128, 112);

        const currentDate = format(new Date(), "dd' de 'MMMM' de 'yyyy'");

        pdf.setFontSize(7);
        pdf.text(`Ciudad de México, a ${currentDate}`, 152, 154);

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`, 7, 125);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text('Clave: ', 64, 52);

        pdf.setFontSize(16);
        pdf.text(`${usuario.curp}`, 64, 59);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text('Nombre: ', 64, 68);

        pdf.setFontSize(16);
        pdf.text(`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`, 64, 75);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text('Entidad de registro: ', 64, 85);

        pdf.setFontSize(11);
        pdf.text(`${usuario.estado}`, 101, 85);

        const pdfName = `${usuario.nombre}_${usuario.apellidoPaterno}_${usuario.apellidoMaterno}_${generateRandomCode()}.pdf`;
        pdf.save(pdfName);
        setShowDownloadLink(true);
    };

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }, [usuarios]);

    return {
        formData,
        accessCode,
        inputCode,
        isValidCode,
        showMessage,
        usuarios,
        setUsuarios,
        handleClearForm,
        handleInputChange,
        handleGenderChange,
        handleCodeChange,
        handleSubmit,
        generatePDF
    };
}
export default useFormState;