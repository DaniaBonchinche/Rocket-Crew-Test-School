import { useForm } from 'react-hook-form';
import { SchoolRequest, SchoolType } from '../models/schools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createSchool } from '../api/schools';
import { toast } from 'react-toastify';

const schema = yup.object({
    name: yup.string().required(),
    edrpou: yup.string().required().matches(/^\d{8}$/),
    region: yup.string().required(),
    type: yup
        .mixed<SchoolType>()
        .oneOf(['GYMNASIUM', 'LYCEUM', 'ZZSO'])
        .required('Тип обовʼязковий'),
});

const SCHOOL_TYPES: SchoolType[] = ['GYMNASIUM', 'LYCEUM', 'ZZSO'];

const CreateSchoolModal = ({
                               onClose,
                               onCreated,
                           }: {
    onClose: () => void;
    onCreated: () => void;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SchoolRequest>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: SchoolRequest) => {
        try {
            await createSchool(data);
            toast.success('Школу створено');
            reset();
            onCreated();
            onClose();
        } catch {
            toast.error('Помилка при створенні школи');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Створення школи</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <input
                            {...register('name')}
                            placeholder="Назва школи"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register('edrpou')}
                            placeholder="ЄДРПОУ (8 цифр)"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.edrpou && <p className="text-red-500 text-sm">{errors.edrpou.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register('region')}
                            placeholder="Область"
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
                    </div>
                    <div>
                        <select {...register('type')} className="w-full border rounded px-3 py-2">
                            <option value="">Оберіть тип</option>
                            {SCHOOL_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Створити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSchoolModal;
