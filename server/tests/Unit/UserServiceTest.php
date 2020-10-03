<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Unit test for create user
     *
     * @return void
     */
    public function testCreateUser()
    {
        $this->removeUserTest();
        $user = (new UserService)->createUser('test', 'test@mail.com', 'test1234');

        $this->assertEquals('test', $user->name);
        $this->assertEquals('test@mail.com', $user->email);
        $this->assertTrue(Hash::check('test1234', $user->password));
    }

    /**
     * Unit test for successful login
     *
     * @return void
     */
    public function testLoginUser()
    {
        $token = (new UserService)->generateToken('test@mail.com', 'test1234');
        $this->assertNotEmpty($token);
    }

    /**
     * Unit test for unsuccessful login with invalid credential
     *
     * @return void
     */
    public function testLoginUserInvalid()
    {
        $token = (new UserService)->generateToken('test@mail.com', 'test123');
        $this->assertEquals( '', $token);
    }

    /**
     * Unit test for unsuccessful login with invalid credential email that does not exist
     *
     * @return void
     */
    public function testLoginUserInvalidEmail()
    {
        $token = (new UserService)->generateToken('test1@mail.com', 'test1234');
        $this->assertEquals( '', $token);
    }

    private function removeUserTest()
    {
        $testUser = User::where('email', 'test@mail.com')->first();
        if (!is_null($testUser)) {
            $testUser->delete();
        }
    }
}
