<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PostController;

// Ruta de Login (página inicial)
Route::get('/', function () {
    return inertia('Auth/Login'); // Muestra el formulario de login
})->middleware('guest')->name('login');

// Ruta para manejar el Login (POST)
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');

// Ruta para Logout (POST)
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Rutas protegidas por autenticación (Posts)
Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
});
