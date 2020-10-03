<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        try {
            $user = (new UserService)->createUser(
                $request->get('name'),
                $request->get('email'),
                $request->get('password'),
            );
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            return response()->json(['message' => 'success', 'token' => $token, 'expires_in' => Carbon::now()->addDay()]);
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
            return response()->json(['message' => 'success', 'token' => $token, 'expires_in' => Carbon::now()->addDay()], 200);
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
