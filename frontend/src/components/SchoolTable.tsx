import { useEffect, useState } from 'react';
import { School, SchoolType } from '../models/schools';
import { fetchSchools, deactivateSchool } from '../api/schools';
import { toast } from 'react-toastify';

const SCHOOL_TYPES: SchoolType[] = ['GYMNASIUM', 'LYCEUM', 'ZZSO'];

const SchoolTable = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [region, setRegion] = useState('');
    const [type, setType] = useState<SchoolType | ''>('');
    const [isActive, setIsActive] = useState<boolean | ''>('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const loadData = async () => {
        try {
            const response = await fetchSchools({
                region: region || undefined,
                type: type || undefined,
                isActive: isActive !== '' ? isActive : undefined,
                page,
                size: pageSize,
            });
            setSchools(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error('Не вдалося завантажити школи');
        }
    };

    useEffect(() => {
        loadData();
    }, [page, pageSize]);

    const handleDeactivate = async (id: number) => {
        if (!window.confirm('Ви впевнені, що хочете деактивувати школу?')) return;
        try {
            await deactivateSchool(id);
            toast.success('Школу деактивовано');
            loadData();
        } catch {
            toast.error('Помилка при деактивації');
        }
    };


    const canGoPrev = page > 0;
    const canGoNext = page < totalPages - 1;

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Область"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="border px-3 py-2 rounded-md w-40"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as SchoolType | '')}
                    className="border px-3 py-2 rounded-md w-40"
                >
                    <option value="">Тип</option>
                    {SCHOOL_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                <select
                    value={isActive.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        setIsActive(val === '' ? '' : val === 'true');
                    }}
                    className="border px-3 py-2 rounded-md w-40"
                >
                    <option value="">Активність</option>
                    <option value="true">Активні</option>
                    <option value="false">Неактивні</option>
                </select>

                <button
                    onClick={loadData}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Застосувати фільтри
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-3 py-2 border-b">ID</th>
                        <th className="px-3 py-2 border-b">Назва</th>
                        <th className="px-3 py-2 border-b">ЄДРПОУ</th>
                        <th className="px-3 py-2 border-b">Область</th>
                        <th className="px-3 py-2 border-b">Тип</th>
                        <th className="px-3 py-2 border-b">Статус</th>
                        <th className="px-3 py-2 border-b text-center">Дія</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schools.map((school) => (
                        <tr key={school.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border-b">{school.id}</td>
                            <td className="px-3 py-2 border-b">{school.name}</td>
                            <td className="px-3 py-2 border-b">{school.edrpou}</td>
                            <td className="px-3 py-2 border-b">{school.region}</td>
                            <td className="px-3 py-2 border-b">{school.type}</td>
                            <td className="px-3 py-2 border-b">
                                {school.active ? (
                                    <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-medium">
                      Активна
                    </span>
                                ) : (
                                    <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-medium">
                      Неактивна
                    </span>
                                )}
                            </td>
                            <td className="px-3 py-2 border-b text-center">
                                {school.active && (
                                    <button
                                        onClick={() => handleDeactivate(school.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                                    >
                                        Деактивувати
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {schools.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500">
                                Немає шкіл для відображення
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>


            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!canGoPrev}
                    className={`px-4 py-2 rounded ${canGoPrev ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Попередня
                </button>
                <span>Сторінка {page + 1} з {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!canGoNext}
                    className={`px-4 py-2 rounded ${canGoNext ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Наступна
                </button>
            </div>
        </div>
    );
};

export default SchoolTable;
