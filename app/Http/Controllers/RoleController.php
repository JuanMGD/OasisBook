<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index()
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage roles'], 401);
        if(!$user->role->allow_manage_roles) return response()->json(['error' => 'Unauthorized to manage roles'], 401);

        $roles = [];

        foreach (Role::all() as $role) {
            $roles[] = [
                "id" => $role->id,
                "name" => $role->name,
                'allow_read' => $role->allow_read,
                'allow_write' => $role->allow_write,
                'allow_delete' => $role->allow_delete,
                'allow_manage_users' => $role->allow_manage_users,
                'allow_manage_roles' => $role->allow_manage_roles,
            ];
        }

        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage roles'], 401);
        if(!$user->role->allow_manage_roles) return response()->json(['error' => 'Unauthorized to manage roles'], 401);

        $this->validate($request, [
            'name' => 'required|max:45',
            'allow_read' => 'boolean',
            'allow_write' => 'boolean',
            'allow_delete' => 'boolean',
            'allow_manage_users' => 'boolean',
            'allow_manage_roles' => 'boolean',
        ]);

        $role = new Role();
        $role->name = $request->name;
        $role->allow_read = $request->allow_read;
        $role->allow_write = $request->allow_write;
        $role->allow_delete = $request->allow_delete;
        $role->allow_manage_users = $request->allow_manage_users;
        $role->allow_manage_roles = $request->allow_manage_roles;
        $role->save();
        return $role;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage roles'], 401);
        if(!$user->role->allow_manage_roles) return response()->json(['error' => 'Unauthorized to manage roles'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'name' => 'required|max:45',
            'allow_read' => 'boolean',
            'allow_write' => 'boolean',
            'allow_delete' => 'boolean',
            'allow_manage_users' => 'boolean',
            'allow_manage_roles' => 'boolean',
        ]);

        $role = Role::find($request->id);
        $role->name = $request->name;
        $role->allow_read = $request->allow_read;
        $role->allow_write = $request->allow_write;
        $role->allow_delete = $request->allow_delete;
        $role->allow_manage_users = $request->allow_manage_users;
        $role->allow_manage_roles = $request->allow_manage_roles;
        $role->save();
        return $role;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage roles'], 401);
        if(!$user->role->allow_manage_roles) return response()->json(['error' => 'Unauthorized to manage roles'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
        ]);
        
        $role = Role::find($request->id);
        return $role->delete();
    }
}
