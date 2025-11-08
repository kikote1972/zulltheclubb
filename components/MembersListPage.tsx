
import React, { useState } from 'react';
import { Page, Member } from '../types.ts';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon.tsx';
import { PencilIcon } from './icons/PencilIcon.tsx';
import Logo from './Logo.tsx';

interface MembersListPageProps {
    navigateTo: (page: Page) => void;
    members: Member[];
    onEditMember: (member: Member) => void;
}

const MembersListPage: React.FC<MembersListPageProps> = ({ navigateTo, members, onEditMember }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = members.filter(member => {
        const searchTermLower = searchTerm.toLowerCase();
        const fullName = `${member.name} ${member.lastName}`.toLowerCase();
        
        return (
            member.memberId.toLowerCase().includes(searchTermLower) ||
            fullName.includes(searchTermLower) ||
            member.dni.toLowerCase().includes(searchTermLower) ||
            member.email.toLowerCase().includes(searchTermLower)
        );
    });

    const handleExportCSV = () => {
        if (filteredMembers.length === 0) {
            alert("No hay socios para exportar.");
            return;
        }

        const headers = [
            "Nº Socio",
            "Nombre Completo",
            "DNI",
            "Correo Electrónico",
            "Fecha de Nacimiento"
        ];
        
        const csvHeader = headers.join(',') + '\n';

        const csvRows = filteredMembers.map(member => {
            const memberId = `"${member.memberId}"`;
            const fullName = `"${member.name} ${member.lastName}"`;
            const dni = `"${member.dni}"`;
            const email = `"${member.email}"`;
            const dob = `"${member.dob}"`;
            return [memberId, fullName, dni, email, dob].join(',');
        }).join('\n');

        const csvContent = csvHeader + csvRows;

        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `socios_zull_the_club_${date}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                     <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Volver al Inicio
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white text-right">Listado de Socios</h1>
                        <Logo className="h-12 w-12" />
                    </div>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                         <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por Nº Socio, nombre, DNI o email..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            aria-label="Buscar socios"
                        />
                    </div>
                    <button 
                        onClick={handleExportCSV}
                        className="w-full sm:w-auto flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={filteredMembers.length === 0}
                        aria-label="Exportar a CSV"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Exportar CSV</span>
                    </button>
                </div>


                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        {members.length > 0 && (
                            <div className="px-6 py-4">
                                <p className="text-sm text-gray-400">
                                    Mostrando <span className="font-bold text-white">{filteredMembers.length}</span> de <span className="font-bold text-white">{members.length}</span> socios.
                                </p>
                            </div>
                        )}
                        {members.length === 0 ? (
                            <div className="text-center py-16 px-6">
                                <p className="text-lg text-gray-400">No hay socios registrados todavía.</p>
                                <button onClick={() => navigateTo('register')} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 duration-300">
                                    Registrar un Socio
                                </button>
                            </div>
                        ) : filteredMembers.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            Nº Socio
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            Nombre Completo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            DNI
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            Correo Electrónico
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            Fecha de Nacimiento
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredMembers.map((member, index) => (
                                        <tr key={index} className="hover:bg-gray-800/60 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                                                {member.memberId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                {member.name} {member.lastName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {member.dni}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {member.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {member.dob}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    onClick={() => onEditMember(member)}
                                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-1.5"
                                                    aria-label={`Editar a ${member.name} ${member.lastName}`}
                                                >
                                                  <PencilIcon className="h-4 w-4" />
                                                  Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-16 px-6">
                                <p className="text-lg text-gray-400">No se encontraron socios.</p>
                                <p className="text-sm text-gray-500 mt-2">Intenta con otro término de búsqueda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersListPage;