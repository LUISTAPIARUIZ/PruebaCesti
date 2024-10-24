import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Registro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
