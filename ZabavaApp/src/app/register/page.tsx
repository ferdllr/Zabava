'use client'
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, InputAdornment, IconButton, Input, Box, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './register.css';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import Footer from '../components/Footer';

export enum TipoUsuario {
    PROPRIETARIO = 'PROPRIETARIO',
    PRODUTOR = 'PRODUTOR',
    STAFF = 'STAFF'
}

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
    cpf: string;
    tipo: TipoUsuario;
}

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tipo, setTipo] = useState<TipoUsuario>(TipoUsuario.PROPRIETARIO);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const data: RegisterRequestBody = { name, email, password, cpf, tipo };
            const response = await fetch('http://localhost:4000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Registro falhou');
            }

            const responseData = await response.json();
            console.log(responseData);

            // Redirecionar para a página de login ou home
            router.push('/login'); // Ajuste o caminho conforme necessário
        } catch (error) {
            console.error('Registration error:', error);
            // Tratar o erro de registro (exibir mensagem de erro ao usuário)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleTipoChange = (event: SelectChangeEvent) => {
        setTipo(event.target.value as TipoUsuario);
    };

    return (
        <Box className='register-page-box'>
            <header className='go-back-header'>
                <Button className='go-back-button' variant='text' onClick={() => router.back()}>
                    <ArrowBackIosNewIcon color='disabled' />Voltar
                </Button>
            </header>
            <div className='register-form'>
                <PersonIcon color='disabled' sx={{ fontSize: 100 }} />
                <Box className='form-container'>
                    <FormControl className='name-box'>
                        <InputLabel htmlFor="standard-adornment-name">Nome Completo</InputLabel>
                        <Input
                            id="standard-adornment-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='email-box'>
                        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                        <Input
                            id="standard-adornment-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='cpf-box'>
                        <InputLabel htmlFor="standard-adornment-cpf">CPF</InputLabel>
                        <Input
                            id="standard-adornment-cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='password-box'>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <FormControl className='confirm-password-box'>
                        <InputLabel htmlFor="standard-adornment-confirm-password">Confirmar Password</InputLabel>
                        <Input
                            id="standard-adornment-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="tipo-label">Tipo de Usuário</InputLabel>
                            <Select
                                labelId="tipo-label"
                                id="tipo-select"
                                value={tipo}
                                label="Tipo de Usuário"
                                onChange={handleTipoChange}
                            >
                                <MenuItem value={TipoUsuario.PROPRIETARIO}>Proprietário</MenuItem>
                                <MenuItem value={TipoUsuario.PRODUTOR}>Produtor</MenuItem>
                                <MenuItem value={TipoUsuario.STAFF}>Staff</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button className='register-button' variant="contained" onClick={handleRegister}>Registrar</Button>
                    <div className='register-bottom-div'>
                        <p>Já possui uma conta na Zabava?</p><Link className='login-link' href="/login" variant="body2">Login</Link>
                    </div>
                </Box>
            </div>
            <Footer />
        </Box>
    );
};

export default Register;
