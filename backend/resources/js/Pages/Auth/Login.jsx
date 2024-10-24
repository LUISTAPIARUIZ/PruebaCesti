import React from 'react';
import { useForm } from '@inertiajs/react';

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/'); // Enviar las credenciales a la ruta de login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-sm">Recuérdame</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;