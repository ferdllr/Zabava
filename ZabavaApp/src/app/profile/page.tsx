// Profile.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Box, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import './profile.css';
import Footer from '../components/Footer';
import PrimaryAppBar from '../components/AppBar';
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
        funcao: '',
        disponibilidade: ''
    });

    const router = useRouter();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setUserData({
                        username: userInfo.name,
                        email: userInfo.email,
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                alert('Não foi possível carregar as informações do usuário. Tente novamente mais tarde.');
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

    const handleStaffSubmit = async () => {
        if (staffData.funcao && staffData.disponibilidade) {
            setIsValidating(true);
            try {
                const response = await fetch('http://localhost:4000/api/trabalho/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(staffData),
                });
                console.log(response)
                if (response.status == 200) {
                    alert('dados enviados com sucesso!');
                    setIsValidating(false);
                    setIsFormSubmitted(true);
                } else{
                    throw new Error('Erro ao enviar os dados');
                }
            } catch (error) {
                setIsValidating(false);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                console.error('Erro ao enviar os dados do staff:', error);
            }
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
            <PrimaryAppBar />
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
                                name="funcao"
                                value={staffData.funcao}
                                onChange={handleInputChange}
                                InputProps={{ readOnly: isFormSubmitted }}
                            />
                        </FormControl>
                        <FormControl className="staff-input">
                            <TextField
                                label="Experiência Anterior"
                                name="disponibilidade"
                                value={staffData.disponibilidade}
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
