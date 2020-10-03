<?php


namespace App\Services;


use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Function that creates a new user
     *
     * @param $name
     * @param $email
     * @param $password
     * @return User
     */
    public function createUser($name, $email, $password)
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();
        return $user;
    }


    /**
     * Function that generate token for login
     *
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
