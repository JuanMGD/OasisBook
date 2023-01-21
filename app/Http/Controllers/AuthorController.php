<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\User;
use Illuminate\Http\Request;

class AuthorController extends Controller
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
        if(!$user->role) return response()->json(['error' => 'Unauthorized to read'], 401);
        if(!$user->role->allow_read) return response()->json(['error' => 'Unauthorized to read'], 401);

        $authors = [];

        foreach (Author::all() as $author) {
            $authors[] = [
                "id" => $author->id,
                "name" => $author->name,
                "about" => $author->about,
            ];
        }

        return response()->json($authors);
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
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'name' => 'required|max:50',
            'about' => 'nullable|max:300',
        ]);

        $author = new Author();
        $author->name = $request->name;
        $author->about = $request->about;
        $author->save();
        return $author;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function show(Author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Author $author)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'name' => 'required|max:50',
            'about' => 'nullable|max:300',
        ]);

        $author = Author::find($request->id);
        $author->name = $request->name;
        $author->about = $request->about;
        $author->save();
        return $author;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Author  $author
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
        
        $author = Author::find($request->id);
        return $author->delete();
    }
}
