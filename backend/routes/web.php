<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PostController;

// Ruta principal (Login Page)
Route::get('/', function () {
    return inertia('Auth/Login'); // Renderiza la vista de Login con Inertia
})->middleware('guest')->name('login');

// Manejo del Login (POST)
Route::post('/', [AuthenticatedSessionController::class, 'store'])->name('login.store');

// Ruta para Logout (POST)
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Rutas de Posts (solo accesibles si el usuario está autenticado)
Route::middleware('auth')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
});
