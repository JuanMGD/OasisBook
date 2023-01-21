<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
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
    
    public function index(Request $request)
    {
        $items = [];
        $user_id = auth('api')->user()->id;

        foreach (Wishlist::all()->where('user_id', $user_id) as $item) {
            $book = $item->book;
            $items[] = [
                "item_id" => $item->id,
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "stock" => $book->stock,
                "image" => $book->image,
                "author" => $book->author->name,
                "category" => $book->category->name,
                // "book" => $item->book()->get(['id', 'title', 'description', 'price', 'stock', 'image']),
            ];
        }

        return response()->json($items);
    }

    // public function checkFavorite(Request $request)
    // {
    //     $isFavorite = Wishlist::all()
    //                 ->where('user_id', $request->user_id)
    //                 ->where('book_id', $request->book_id)
    //                 ->first();

    //     return response()->json($isFavorite);
    // }

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
        $this->validate($request, [
            'user_id' => 'required|integer',
            'book_id' => 'required|integer',
        ]);

        $item = new Wishlist();
        $item->user_id = $request->user_id;
        $item->book_id = $request->book_id;
        $item->save();
        return $item;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function show(Wishlist $wishlist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function edit(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|integer',
        ]);
        
        $item = Wishlist::find($request->id);
        return $item->delete();
    }
}
