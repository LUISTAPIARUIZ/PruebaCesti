import React from 'react';
import { useForm, router } from '@inertiajs/react';

const EditPostModal = ({ isOpen, onClose, post }) => {
    const { data, setData, put, reset } = useForm({
        titulo: post.titulo,
        contenido: post.contenido,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`, {
            onSuccess: () => {
                reset(); // Limpiar formulario
                onClose(); // Cerrar modal
            },
        });
    };

    if (!isOpen) return null; // No renderiza si el modal no está abierto

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Editar Post</h2>
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
                        Guardar Cambios
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

export default EditPostModal;
