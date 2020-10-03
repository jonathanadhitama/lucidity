<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    private $token;

    /**
     * Register Test with no valid data
     *
     * @return void
     */
    public function testRegisterNoDataGiven()
    {
        $this->json('POST', 'api/register')
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'name' => ['The name field is required.'],
                    'email' => ['The email field is required.'],
                    'password' => ['The password field is required.'],
                ]
            ]);
    }

    /**
     * Register Test with no name
     *
     * @return void
     */
    public function testRegisterValid()
    {
        $this->removeUserTest();
        $data = [
            'name' => 'TEST',
            'email' => 'test@mail.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234'
        ];
        $this->json('POST', 'api/register', $data, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson([
                'message' => 'success',
            ]);
    }

    /**
     * Login Test with invalid credentials
     *
     * @return void
     */
    public function testLoginInvalid()
    {
        $data = [
            'email' => 'test@mail.com',
            'password' => 'test123',
        ];
        $this->json('POST', 'api/login', $data, ['Accept' => 'application/json'])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Invalid credentials',
            ]);
    }

    /**
     * Login Test with valid credentials
     *
     * @return void
     */
    public function testLoginValid()
    {
        $data = [
            'email' => 'test@mail.com',
            'password' => 'test1234',
        ];
        $response = $this->json('POST', 'api/login', $data, ['Accept' => 'application/json']);
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'success',
        ]);

        try {
            //Save token for logout testing
            $this->token = $response->decodeResponseJson()['token'];
        } catch (\Throwable $e) {
            \Log::error('Exception triggered in UserControllerTest ' . $e->getMessage());
        }
    }

    /**
     * Logout test with invalid token
     *
     * @return void
     */
    private function testLogoutInvalid()
    {
        $this->json('POST', 'api/logout', [], ['Accept' => 'application/json'])
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    }

    /**
     * Logout test with valid token
     *
     * @return void
     */
    private function testLogoutValid()
    {
        $headerData = ['Accept' => 'application/json', 'Authorization' => 'Bearer ' . $this->token];
        $this->json('POST', 'api/logout', [], $headerData)
            ->assertStatus(200)
            ->assertJson([
                'message' => 'success'
            ]);
    }

    private function removeUserTest()
    {
        $testUser = User::where('email', 'test@mail.com')->first();
        if (!is_null($testUser)) {
            $testUser->delete();
        }
    }

}
