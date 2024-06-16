'use client'
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Input, Typography, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import './payment.css';
import Footer from '../components/Footer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Payment: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentData, setPaymentData] = useState({
        pixKey: '',
        creditCardNumber: '',
        creditCardName: '',
        creditCardExpiry: '',
        creditCardCVV: '',
        bankAccount: '',
        boletoNumber: ''
    });

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentData(prevData => ({ ...prevData, [name]: value }));
    };

    const handlePaymentSubmit = () => {
        // Lógica para processar o pagamento
        alert('Pagamento processado com sucesso!');
    };

    const router = useRouter();

    return (
        <Box className="payment-page-box">
            <header className="go-back-header">
                <Button className="go-back-button" variant="text" onClick={() => router.back()}><ArrowBackIosNewIcon color='disabled' />Voltar</Button>
            </header>
            <div className="payment-content">
                <Typography variant="h4">Pagamento</Typography>
                <FormControl component="fieldset">
                    <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <FormControlLabel value="pix" control={<Radio />} label="Pix" />
                        <FormControlLabel value="creditCard" control={<Radio />} label="Cartão de Crédito" />
                        <FormControlLabel value="bankDeposit" control={<Radio />} label="Depósito Bancário" />
                        <FormControlLabel value="boleto" control={<Radio />} label="Boleto" />
                    </RadioGroup>
                </FormControl>
                
                {paymentMethod === 'pix' && (
                    <Box className="payment-form">
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="pixKey">Chave Pix</InputLabel>
                            <Input
                                id="pixKey"
                                name="pixKey"
                                value={paymentData.pixKey}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                )}

                {paymentMethod === 'creditCard' && (
                    <Box className="payment-form">
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="creditCardNumber">Número do Cartão</InputLabel>
                            <Input
                                id="creditCardNumber"
                                name="creditCardNumber"
                                value={paymentData.creditCardNumber}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="creditCardName">Nome no Cartão</InputLabel>
                            <Input
                                id="creditCardName"
                                name="creditCardName"
                                value={paymentData.creditCardName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="creditCardExpiry">Data de Validade</InputLabel>
                            <Input
                                id="creditCardExpiry"
                                name="creditCardExpiry"
                                value={paymentData.creditCardExpiry}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="creditCardCVV">CVV</InputLabel>
                            <Input
                                id="creditCardCVV"
                                name="creditCardCVV"
                                value={paymentData.creditCardCVV}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                )}

                {paymentMethod === 'bankDeposit' && (
                    <Box className="payment-form">
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="bankAccount">Conta Bancária</InputLabel>
                            <Input
                                id="bankAccount"
                                name="bankAccount"
                                value={paymentData.bankAccount}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                )}

                {paymentMethod === 'boleto' && (
                    <Box className="payment-form">
                        <FormControl className="payment-input">
                            <InputLabel htmlFor="boletoNumber">Número do Boleto</InputLabel>
                            <Input
                                id="boletoNumber"
                                name="boletoNumber"
                                value={paymentData.boletoNumber}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                )}
                
                <Button className='payment-button' variant="contained" onClick={handlePaymentSubmit}>Pagar</Button>
            </div>
            <Footer />
        </Box>
    );
};

export default Payment;
