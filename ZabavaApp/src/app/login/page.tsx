'use client'
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, InputAdornment, IconButton, Input, Box, Link, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import './login.css';
import { storeToken } from '../api/authHandler';



interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

interface LoginRequestBody {
    email: string;
    password: string;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const data: LoginRequestBody = { email, password };
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const responseData = await response.json();
            storeToken(responseData.token)
            console.log(responseData);

            // Show success message
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                router.push('/profile');
            }, 3000);
        } catch (error) {
            console.error('Login error:', error);
            // Show error message
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box className='login-page-box'>
            <header className='go-back-header'>
                <Button className='go-back-button' variant='text' onClick={() => router.back()}>
                    <ArrowBackIosNewIcon color='disabled' />Voltar
                </Button>
            </header>
            <div className='login-form'>
                <PersonIcon color='disabled' sx={{ fontSize: 100 }} />
                <Box className='form-container'>
                    <FormControl className='email-box'>
                        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                        <Input
                            id="standard-adornment-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='password-box'>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress} // Adiciona evento de teclado
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Link className='forgot-link' href="#" variant="body2">Esqueceu a senha?</Link>
                    <Button className='login-button' variant="contained" onClick={handleLogin}>Login</Button>
                    <div className='login-bottom-div'>
                        <p>Ainda não possui cadastro na Zabava?</p><Link className='register-link' href="#" variant="body2">Cadastrar</Link>
                    </div>
                </Box>
            </div>
            <Footer />

            <Snackbar open={error !== ''} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
            
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Login successful
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
