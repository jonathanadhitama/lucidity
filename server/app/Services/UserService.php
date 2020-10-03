<?php


namespace App\Services;


use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * @param $name
     * @param $email
     * @param $password
     */
    public function createUser($name, $email, $password)
    {
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
    }


    /**
     * @param $email
     * @param $password
     * @return string
     */
    public function generateToken($email, $password)
    {
        $user = User::where('email', $email)->first();
        if (!is_null($user)) {
            if (Hash::check($password, $user->password)) {
                return $user->createToken('Laravel Password Grant Client')->accessToken;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}
