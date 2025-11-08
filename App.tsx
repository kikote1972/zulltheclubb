
import React, { useState, useCallback, useEffect } from 'react';
import HomePage from './components/HomePage.tsx';
import RegisterPage from './components/RegisterPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import MembersListPage from './components/MembersListPage.tsx';
import EditMemberPage from './components/EditMemberPage.tsx';
import ScanRegisterPage from './components/ScanRegisterPage.tsx';
import { Page, Member } from './types.ts';

const initialMembers: Member[] = [
    { memberId: 'ZTC-001', name: 'Juan', lastName: 'Pérez', dni: '12345678A', dob: '1990-01-15', email: 'juan.perez@example.com' },
    { memberId: 'ZTC-002', name: 'Ana', lastName: 'García', dni: '87654321B', dob: '1995-05-20', email: 'ana.garcia@example.com' },
];

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [scannedMemberData, setScannedMemberData] = useState<Omit<Member, 'memberId'> | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');

        if (page === 'scanRegister') {
            const name = params.get('name');
            const lastName = params.get('lastName');
            const dni = params.get('dni');
            const dob = params.get('dob');
            const email = params.get('email');

            if (name && lastName && dni && dob && email) {
                setScannedMemberData({ name, lastName, dni, dob, email });
                setCurrentPage('scanRegister');
            } else {
                // Invalid scan, go to home and clean URL
                window.history.replaceState({}, '', window.location.pathname);
                setCurrentPage('home');
            }
        }
    }, []);

    const navigateTo = useCallback((page: Page) => {
        // Clean URL if we are coming from a page loaded via query params.
        if (new URLSearchParams(window.location.search).has('page')) {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }, []);

    const addMember = useCallback((member: Member) => {
        setMembers(prevMembers => [...prevMembers, member]);
    }, []);

    const handleEditMember = useCallback((member: Member) => {
        setEditingMember(member);
        navigateTo('editMember');
    }, [navigateTo]);

    const updateMember = useCallback((updatedMember: Member) => {
        setMembers(prevMembers => 
            prevMembers.map(m => m.memberId === updatedMember.memberId ? updatedMember : m)
        );
        setEditingMember(null);
        navigateTo('members');
    }, [navigateTo]);

    const renderPage = () => {
        switch (currentPage) {
            case 'scanRegister':
                 if (scannedMemberData) {
                    const nextMemberId = `ZTC-${String(members.length + 1).padStart(3, '0')}`;
                    return <ScanRegisterPage 
                                addMember={addMember} 
                                memberData={scannedMemberData} 
                                nextMemberId={nextMemberId} 
                            />;
                }
                // Fallback, though useEffect should handle this.
                return <HomePage navigateTo={navigateTo} />;
            case 'register':
                const nextMemberId = `ZTC-${String(members.length + 1).padStart(3, '0')}`;
                return <RegisterPage navigateTo={navigateTo} addMember={addMember} nextMemberId={nextMemberId} />;
            case 'login':
                return <LoginPage navigateTo={navigateTo} />;
            case 'members':
                return <MembersListPage navigateTo={navigateTo} members={members} onEditMember={handleEditMember} />;
            case 'editMember':
                if (!editingMember) {
                    // Fallback if page is accessed directly without a member to edit
                    return <MembersListPage navigateTo={navigateTo} members={members} onEditMember={handleEditMember} />;
                }
                return <EditMemberPage navigateTo={navigateTo} member={editingMember} onUpdateMember={updateMember} />;
            case 'home':
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-[#0a0f2c] min-h-screen text-gray-200">
            {renderPage()}
        </div>
    );
};

export default App;