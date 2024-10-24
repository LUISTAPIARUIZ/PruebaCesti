<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(['message' => 'Login exitoso'], 200);
        } else {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout exitoso'], 200);
    }
}
