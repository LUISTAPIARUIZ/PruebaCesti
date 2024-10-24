// resources/js/Pages/Posts/CreatePostModal.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';

const CreatePostModal = ({ isOpen, onClose }) => {
    const { data, setData, post, reset } = useForm({
        titulo: '',
        contenido: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                reset(); // Limpiar el formulario después de enviar
                onClose(); // Cerrar el modal
            },
        });
    };

    if (!isOpen) return null; // No renderizar si el modal no está abierto

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Crear Nuevo Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Título</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contenido</label>
                        <textarea
                            value={data.contenido}
                            onChange={(e) => setData('contenido', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
