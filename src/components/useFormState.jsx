// useFormState.js
import { useState, useEffect } from 'react';

export function useFormState(initialState) {
    const [formData, setFormData] = useState(initialState);
    const [curp, setCurp] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showDownloadLink, setShowDownloadLink] = useState(false);

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

    return {
        formData,
        curp,
        accessCode,
        inputCode,
        isValidCode,
        showMessage,
        showDownloadLink,
        setFormData,
        setCurp,
        setAccessCode,
        setInputCode,
        setIsValidCode,
        setShowMessage,
        setShowDownloadLink,
        handleClearForm,
        handleInputChange,
        handleCodeChange
    };
}