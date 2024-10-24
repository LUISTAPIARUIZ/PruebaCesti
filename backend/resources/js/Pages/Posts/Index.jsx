import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal';

const Index = () => {
    const { posts } = usePage().props; // Obtener los posts desde Laravel
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null); // Almacena el post a editar

    const handleLogout = () => {
        router.post('/logout', {}, { onSuccess: () => router.visit('/') });
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
            router.delete(`/posts/${id}`);
        }
    };

    const handleOpenEditModal = (post) => {
        setPostToEdit(post); // Establecer el post a editar
        setIsEditModalOpen(true); // Abrir el modal de edición
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-3">
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
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                    Crear Nuevo Post
                </button>

                <ul className="divide-y divide-gray-300">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.id} className="py-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold">{post.titulo}</h2>
                                        <p className="mb-1">{post.contenido}</p>
                                        <p className="text-sm text-gray-500">
                                            Creado: {formatDate(post.created_at)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Última edición: {formatDate(post.updated_at)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEditModal(post)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No hay posts disponibles.</p>
                    )}
                </ul>
            </div>

            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            {postToEdit && (
                <EditPostModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    post={postToEdit}
                />
            )}
        </div>
    );
};

export default Index;
