
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Member } from '../types.ts';

interface ScanRegisterPageProps {
    addMember: (member: Member) => void;
    memberData: Omit<Member, 'memberId'>;
    nextMemberId: string;
}

const ScanRegisterPage: React.FC<ScanRegisterPageProps> = ({ addMember, memberData, nextMemberId }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const newMember: Member = {
            memberId: nextMemberId,
            ...memberData,
        };
        addMember(newMember);
        // Use a small timeout to make the loading state visible
        const timer = setTimeout(() => setIsRegistered(true), 500);
        return () => clearTimeout(timer);
    }, [addMember, memberData, nextMemberId]);

    if (!isRegistered) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f2c] p-4">
                <div className="text-center text-white">
                    <svg className="animate-spin h-10 w-10 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg">Procesando registro...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f2c] to-[#101847] p-4">
            <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">¡Registro Completado!</h2>
                <p className="text-gray-300 mb-1">Bienvenido/a, <strong className="text-white">{memberData.name} {memberData.lastName}</strong>.</p>
                <p className="text-gray-300 mb-6">Tu código QR de socio ha sido generado con tu número: <strong className="font-mono text-white">{nextMemberId}</strong></p>
                <div className="bg-white p-4 rounded-lg inline-block mb-6">
                    <QRCodeSVG value={nextMemberId} size={224} />
                </div>
                <div className="text-left bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="font-bold text-lg text-cyan-300 mb-2">Importante</h3>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                        <li>Se ha enviado una copia de este código QR a tu correo electrónico.</li>
                        <li>Deberás presentar este código en cada visita.</li>
                        <li>El código es único, personal e intransferible.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ScanRegisterPage;
