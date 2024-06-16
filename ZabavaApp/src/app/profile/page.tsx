// Profile.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Box, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import './profile.css';
import Footer from '../components/Footer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getUserInfo } from '../api/authHandler';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isStaffFormVisible, setIsStaffFormVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    });
    const [staffData, setStaffData] = useState({
        role: '',
        experience: '',
        proof: ''
    });

    const router = useRouter();

    useEffect(() => {
        async function fetchUserData() {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserData({
                    username: userInfo.name,
                    email: userInfo.email,
                });
            }
        }

        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleStaffToggle = () => {
        if (isFormSubmitted) {
            router.push('/events');
        } else {
            setIsStaffFormVisible(true);
        }
    };

    const handleStaffSubmit = () => {
        if (staffData.role && staffData.experience && staffData.proof) {
            setIsValidating(true);
            // Simular tempo para validação
            setTimeout(() => {
                setIsValidating(false);
                setIsFormSubmitted(true);
            }, 3000);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStaffData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <Box className="profile-page-box">
            <header className="go-back-header">
                <Button className="go-back-button" variant="text" onClick={() => router.back()}><ArrowBackIosNewIcon color='disabled' />Voltar</Button>
            </header>
            <div className="profile-content">
                <Typography variant="h4">Perfil</Typography>
                <Box className="profile-details">
                    {isEditing ? (
                        <Box>
                            <FormControl className="profile-input">
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input
                                    id="username"
                                    value={userData.username}
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                />
                            </FormControl>
                            <FormControl className="profile-input">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                />
                            </FormControl>
                            <Button className='save-button' variant="contained" onClick={handleEditToggle}>Salvar</Button>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
                            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                            <Button className='edit-button' variant="contained" onClick={handleEditToggle}>Editar Informações do Perfil</Button>
                        </Box>
                    )}
                </Box>
                {isStaffFormVisible ? (
                    <Box className="staff-form">
                        <Typography variant="h5">Cadastro de Staff</Typography>
                        <FormControl className="staff-input">
                            <TextField
                                label="Função"
                                name="role"
                                value={staffData.role}
                                onChange={handleInputChange}
                                InputProps={{ readOnly: isFormSubmitted }}
                            />
                        </FormControl>
                        <FormControl className="staff-input">
                            <TextField
                                label="Experiência Anterior"
                                name="experience"
                                value={staffData.experience}
                                onChange={handleInputChange}
                                InputProps={{ readOnly: isFormSubmitted }}
                            />
                        </FormControl>
                        <FormControl className="staff-input">
                            <TextField
                                label="Comprovantes de Habilidades"
                                name="proof"
                                value={staffData.proof}
                                onChange={handleInputChange}
                                InputProps={{ readOnly: isFormSubmitted }}
                            />
                        </FormControl>
                        {isFormSubmitted ? (
                            <Typography variant="body2" color="textSecondary" align="right">Enviado para análise</Typography>
                        ) : (
                            <Button className='submit-form-button' variant="contained" onClick={handleStaffSubmit}>Enviar para Validação</Button>
                        )}
                    </Box>
                ) : (
                    <Button
                        className='want-to-work-button'
                        variant="contained"
                        onClick={handleStaffToggle}
                        disabled={isValidating}
                    >
                        {isValidating ? 'Validando...' : isFormSubmitted ? 'Eventos disponíveis na minha região' : 'Quero Trabalhar como Staff'}
                    </Button>
                )}
            </div>
            <Footer />
        </Box>
    );
};

export default Profile;
