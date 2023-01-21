<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $categories = [];

        foreach (Category::all() as $category) {
            $categories[] = [
                "id" => $category->id,
                "name" => $category->name,
                "description" => $category->description,
            ];
        }

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'name' => 'required|max:45',
            'description' => 'nullable|max:150',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();
        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'name' => 'required|max:45',
            'description' => 'nullable|max:150',
        ]);

        $category = Category::find($request->id);
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to delete'], 401);
        if(!$user->role->allow_delete) return response()->json(['error' => 'Unauthorized to delete'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
        ]);
        
        $category = Category::find($request->id);
        return $category->delete();
    }
}
