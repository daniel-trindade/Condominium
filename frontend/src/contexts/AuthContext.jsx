import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Criar o Contexto
export const AuthContext = createContext(null);

// 2. Criar o Provedor (Provider)
// Este componente irá "abraçar" sua aplicação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Para checar se já validou o token
    const navigate = useNavigate();

    // Efeito para verificar se o usuário já tem um token no localStorage
    // (Simulando a persistência do login)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Termina a verificação inicial
    }, []);

    // Função de Login
    const login = async (email, password) => {
        // --- LÓGICA DE API REAL IRIA AQUI ---
        // Ex: const response = await api.post('/login', { email, password });
        //     const { user, token } = response.data;

        // Simulando uma resposta de API bem-sucedida
        if (email === 'sindico@condominio.com' && password === '123456') {
            const simulatedUser = { id: 1, name: 'Síndico Teste', email: email };
            
            // Salva o usuário no localStorage e no estado
            localStorage.setItem('user', JSON.stringify(simulatedUser));
            // localStorage.setItem('token', token); // Salvaria o token real aqui
            setUser(simulatedUser);

            // Redireciona para o dashboard
            navigate('/dashboard');
        } else {
            // Lança um erro que a LoginPage pode capturar
            throw new Error('Email ou senha inválidos');
        }
    };

    // Função de Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // localStorage.removeItem('token');
        navigate('/login');
    };

    // O valor que será compartilhado com todos os componentes
    const authContextValue = {
        isAuthenticated: !!user, // !! transforma o objeto user em boolean (true se user existe, false se é null)
        user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};