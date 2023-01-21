<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage users'], 401);
        if(!$user->role->allow_manage_users) return response()->json(['error' => 'Unauthorized to manage users'], 401);
        
        $users = [];

        foreach (User::all() as $user) {
            $users[] = [
                "id" => $user->id,
                "email" => $user->email,
                "name" => $user->name,
                "role_id" => $user->role_id,
                "role" => $user->role ? $user->role['name'] : null,
            ];
        }

        return response()->json($users);
    }

    public function showUserPurchases(Request $request)
    {
        $purchases = [];
        $user_id = auth('api')->user()->id;

        foreach (User::find($user_id)->sales->groupBy('book_id') as $purchase) {
            $book = $purchase[0]->book;
            $bookRating = $book->ratings->where('user_id', $user_id)->first();
            $purchases[] = [
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "image" => $book->image,
                "author" => $book->author->name,
                "category" => $book->category->name,
                "rating" => $bookRating ? ["id" => $bookRating->id, "stars" => $bookRating->stars, "comment" => $bookRating->comment ] : null,
            ];
        }

        return response()->json($purchases);
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
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage users'], 401);
        if(!$user->role->allow_manage_users) return response()->json(['error' => 'Unauthorized to manage users'], 401);

        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'role_id' => 'required|integer',
        ]);

        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        $user->role_id = $request->role_id;
        $user->save();

        // $token = $user->createToken('OasisBookAuthApp')->accessToken;

        return response()->json([
            "id" => $user->id,
            "email" => $user->email,
            "name" => $user->name,
            "role_id" => $user->role_id,
            "role" => $user->role['name'],
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage users'], 401);
        if(!$user->role->allow_manage_users) return response()->json(['error' => 'Unauthorized to manage users'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'email' => 'required|email',
            'name' => 'required|max:70',
            'role_id' => 'required|integer',
        ]);

        $user = User::find($request->id);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->role_id = $request->role_id;
        $user->save();
        return [
            "id" => $user->id,
            "email" => $user->email,
            "name" => $user->name,
            "role_id" => $user->role_id,
            "role" => $user->role['name'],
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to manage users'], 401);
        if(!$user->role->allow_manage_users) return response()->json(['error' => 'Unauthorized to manage users'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
        ]);
        
        $user = User::find($request->id);
        return $user->delete();
    }
}
