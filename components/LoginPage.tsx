

import React, { useState } from 'react';
import { Page } from '../types.ts';
import Logo from './Logo.tsx';
import { EyeIcon } from './icons/EyeIcon.tsx';
import { EyeOffIcon } from './icons/EyeOffIcon.tsx';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon.tsx';


interface LoginPageProps {
    navigateTo: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Funcionalidad de inicio de sesión no implementada en esta demostración.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0f2c] to-[#101847]">
            <div className="absolute top-4 left-4">
                <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Volver
                </button>
            </div>
            <div className="w-full max-w-sm bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                   <Logo className="h-16 w-16 mx-auto" />
                   <h2 className="text-3xl font-bold text-white mt-4">Iniciar Sesión</h2>
                   <p className="text-gray-400 mt-1">Accede a tu cuenta de Zull The Club</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com" 
                            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6 relative">
                         <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                         <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Tu contraseña" 
                            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        Iniciar Sesión
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes cuenta?{' '}
                    <button onClick={() => navigateTo('register')} className="font-medium text-cyan-400 hover:text-cyan-300">
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;