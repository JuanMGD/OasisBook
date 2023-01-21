<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use App\Models\User;
use Illuminate\Http\Request;

class PublisherController extends Controller
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
        // return Publisher::latest()->paginate(10);
        // return Publisher::all();
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to read'], 401);
        if(!$user->role->allow_read) return response()->json(['error' => 'Unauthorized to read'], 401);

        $publishers = [];

        foreach (Publisher::all() as $publisher) {
            $publishers[] = [
                "id" => $publisher->id,
                "name" => $publisher->name,
                "about" => $publisher->about,
            ];
        }

        return response()->json($publishers);
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
            'name' => 'required|max:45',
            'about' => 'nullable|max:300',
        ]);

        $publisher = new Publisher();
        $publisher->name = $request->name;
        $publisher->about = $request->about;
        $publisher->save();
        return $publisher;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Publisher  $publisher
     * @return \Illuminate\Http\Response
     */
    // public function showPublishers()
    // {
    //     // return Publisher::all()->take(10);
    //     return Publisher::latest()->paginate(10);
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Publisher  $publisher
     * @return \Illuminate\Http\Response
     */
    public function edit(Publisher $publisher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Publisher  $publisher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Publisher $publisher)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'name' => 'required|max:45',
            'about' => 'nullable|max:300',
        ]);

        $publisher = Publisher::find($request->id);
        $publisher->name = $request->name;
        $publisher->about = $request->about;
        $publisher->save();
        return $publisher;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Publisher  $publisher
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
        
        $publisher = Publisher::find($request->id);
        return $publisher->delete();
    }
}
