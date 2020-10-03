<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        try {
            (new UserService)->createUser(
                $request->get('name'),
                $request->get('email'),
                $request->get('password'),
            );
            return response()->json(['message' => 'success']);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()]);
        }
    }

    public function login(LoginUserRequest $request)
    {
        $token = (new UserService)->generateToken(
            $request->get('email'),
            $request->get('password')
        );
        if (strlen($token) === 0) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        } else {
            return response()->json(['message' => 'success', 'token' => $token], 200);
        }
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            //To revoke user's access token
            $request->user()->token()->revoke();
            return response()->json(['message' => 'success']);
        }
    }
}
