import SchoolTable from '../components/SchoolTable';
import CreateSchoolModal from '../components/CreateSchoolModal';
import { useState } from 'react';

const SchoolsPage = () => {
    const [reloadKey, setReloadKey] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const reload = () => setReloadKey((prev) => prev + 1);

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Список шкіл</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Створити школу
                </button>
            </div>

            <SchoolTable key={reloadKey} />

            {showModal && (
                <CreateSchoolModal
                    onClose={() => setShowModal(false)}
                    onCreated={reload}
                />
            )}
        </div>
    );
};

export default SchoolsPage;
