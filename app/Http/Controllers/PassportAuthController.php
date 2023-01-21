<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PassportAuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        // $user->role_id = null;
        $user->save();

        $token = $user->createToken('OasisBookAuthApp')->accessToken;

        return response()->json([
            'token' => $token, 
            'name' => $user->name, 
            'role' => $user->role->except('created_at', 'updated_at')
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('OasisBookAuthApp')->accessToken;
            $role = auth()->user()->role;
            return response()->json([
                'token' => $token, 
                'name' => auth()->user()->name,
                'role' => $role ? $role->only(["allow_read", "allow_write", "allow_delete", "allow_manage_users", "allow_manage_roles"]) : null
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getUserByToken(Request $request)
    {
        $token = auth('api')->user();
        $user = $token ? User::find($token->id) : null;
                
        if($user) return response()->json([ 
            'name' => $user->name,
            'role' => $user->role ? $user->role->only(["allow_read", "allow_write", "allow_delete", "allow_manage_users", "allow_manage_roles"]) : null
        ], 200);

        return response()->json(['error' => 'no token']);
    }
}
