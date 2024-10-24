import React, { useState } from 'react';
import { Link, useForm, usePage, router } from '@inertiajs/react';

const Index = ({ posts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
    const { data, setData, post, reset } = useForm({
        titulo: '',
        contenido: '',
    });

    const handleLogout = () => {
        router.post('/logout', {}, { onSuccess: () => router.visit('/') }); // Redirigir tras logout
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                reset(); // Limpiar el formulario después de enviar
                setIsModalOpen(false); // Cerrar el modal
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Listado de Posts</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                    Crear Nuevo Post
                </button>

                <ul>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.id} className="mt-2">
                                <h2 className="text-xl font-semibold">{post.titulo}</h2>
                                <p>{post.contenido}</p>
                                <Link
                                    href={`/posts/${post.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No hay posts disponibles.</p>
                    )}
                </ul>
            </div>

            {isModalOpen && (
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
                                onClick={() => setIsModalOpen(false)}
                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Index;
