<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate(); // Regenerar la sesión

            // Redirigir a la página de posts
            return redirect()->intended(route('posts.index'));
        }

        // Si las credenciales no son correctas, mostrar error
        return back()->withErrors([
            'email' => 'Las credenciales no son correctas.',
        ])->onlyInput('email');
    }

    public function destroy(Request $request)
    {
        // Cerrar la sesión del usuario
        Auth::logout();

        $request->session()->invalidate(); // Invalidar la sesión
        $request->session()->regenerateToken(); // Regenerar token CSRF

        // Redirigir de nuevo al login
        return redirect('/');
    }
}
