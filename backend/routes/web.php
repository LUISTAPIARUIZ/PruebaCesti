<?php
// routes/web.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PostController;

// Ruta principal (Login Page)
Route::get('/', function () {
    return inertia('Auth/Login'); // Renderiza la vista de Login con Inertia
})->middleware('guest')->name('login');

// Manejo del Login (POST)
Route::post('/', [AuthenticatedSessionController::class, 'store'])->name('login.store');

// Ruta para Registrar Usuario (GET y POST)
Route::get('/register', [RegisteredUserController::class, 'create'])->middleware('guest')->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('guest');

// Ruta para Logout (POST)
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Rutas de Posts (solo accesibles si el usuario está autenticado)
Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class)->except(['show']);
});
