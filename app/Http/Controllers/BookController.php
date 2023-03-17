<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
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

        $books = [];

        foreach (Book::all() as $book) {
            $books[] = [
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "stock" => $book->stock,
                "image" => $book->image,
                "category_id" => $book->category_id,
                "category" => $book->category->name,
                "author_id" => $book->author_id,
                "author" => $book->author->name,
                "publisher_id" => $book->publisher_id,
                "publisher" => $book->publisher->name,
            ];
        }

        return response()->json($books);
    }

    public function showLatestBooks()
    {
        $books = [];

        foreach (Book::latest()->paginate(10) as $book) {
            $books[] = [
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "stock" => $book->stock,
                "image" => $book->image,
                // "category_id" => $book->category_id,
                "category" => $book->category->name,
                // "author_id" => $book->author_id,
                "author" => $book->author->name,
                // "publisher_id" => $book->publisher_id,
                // "publisher" => $book->publisher->name,
                "stars" => $book->ratings->avg('stars'),
            ];
        }

        return response()->json($books);
    }
    
    public function showBooksByCategory(Request $request)
    {
        $books = [];

        $category = Category::find($request->category_id);

        foreach (Book::where('category_id', $request->category_id)->get() as $book) {
            $books[] = [
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "stock" => $book->stock,
                "image" => $book->image,
                // "category_id" => $book->category_id,
                "category" => $book->category->name,
                // "author_id" => $book->author_id,
                "author" => $book->author->name,
                // "publisher_id" => $book->publisher_id,
                // "publisher" => $book->publisher->name,
                "stars" => $book->ratings->avg('stars'),
            ];
        }

        return response()->json(["category" => $category ? $category->name : null, "books" => $books]);
    }
    
    public function showBook(Request $request)
    {
        $book = Book::find($request->id);
        $user_id = auth('api')->user()->id;
        $isFavourite = $book->wishlists->where('user_id', $user_id)->first();
        $book = [
            "id" => $book->id,
            "title" => $book->title,
            "description" => $book->description,
            "price" => $book->price,
            "stock" => $book->stock,
            "image" => $book->image,
            // "category_id" => $book->category_id,
            "category" => $book->category->name,
            // "author_id" => $book->author_id,
            "author" => $book->author->name,
            // "publisher_id" => $book->publisher_id,
            "publisher" => $book->publisher->name,
            "isFavorite" => $isFavourite ? $isFavourite->id : null,
            "stars" => $book->ratings->avg('stars'),
            "ratings" => $book->ratings()->get(['stars', 'comment']),
        ];

        return response()->json($book);
    }

    // Recibe como parámetro un arreglo con lod id
    public function showBookSet(Request $request)
    {
        $books = [];

        foreach ($request->books as $bookID) {
            $book = Book::find($bookID);
            $books[] = [
                "id" => $book->id,
                "title" => $book->title,
                "description" => $book->description,
                "price" => $book->price,
                "stock" => $book->stock,
                "image" => $book->image,
                // "category_id" => $book->category_id,
                "category" => $book->category->name,
                // "author_id" => $book->author_id,
                "author" => $book->author->name,
                // "publisher_id" => $book->publisher_id,
                // "publisher" => $book->publisher->name,
            ];
        }

        return response()->json($books);
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
            'title' => 'required|max:45',
            'description' => 'required|max:500',
            'price' => 'required|numeric|min:1',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image',
            'category_id' => 'required|integer',
            'author_id' => 'required|integer',
            'publisher_id' => 'required|integer',
        ]);

        $book = new Book;
        $book->title = $request->input('title');
        $book->description = $request->input('description');
        $book->price = $request->input('price');
        $book->stock = $request->input('stock');
        $book->image = $request->file('image')->store('covers');
        $book->category_id = $request->input('category_id');
        $book->author_id = $request->input('author_id');
        $book->publisher_id = $request->input('publisher_id');
        $book-> save();
        return [
            "id" => $book->id,
            "title" => $book->title,
            "description" => $book->description,
            "price" => $book->price,
            "stock" => $book->stock,
            "image" => $book->image,
            "category_id" => $book->category_id,
            "category" => $book->category->name,
            "author_id" => $book->author_id,
            "author" => $book->author->name,
            "publisher_id" => $book->publisher_id,
            "publisher" => $book->publisher->name,
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::find(auth('api')->user()->id);
        if(!$user->role) return response()->json(['error' => 'Unauthorized to write'], 401);
        if(!$user->role->allow_write) return response()->json(['error' => 'Unauthorized to write'], 401);

        $this->validate($request, [
            'id' => 'required|integer',
            'title' => 'required|max:45',
            'description' => 'required|max:500',
            'price' => 'required|numeric|min:1',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image',
            'category_id' => 'required|integer',
            'author_id' => 'required|integer',
            'publisher_id' => 'required|integer',
        ]);

        
        $book = Book::find($request->id);
        $book->title = $request->title;
        $book->description = $request->description;
        $book->price = $request->price;
        $book->stock = $request->stock;
        $old_img_path = $request->image ? $book->image : null;
        $book->image = $request->image ? $request->file('image')->store('covers') : $book->image;
        $book->category_id = $request->category_id;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->save();

        if($request->image) File::delete($old_img_path);

        return [
            "id" => $book->id,
            "title" => $book->title,
            "description" => $book->description,
            "price" => $book->price,
            "stock" => $book->stock,
            "image" => $book->image,
            "category_id" => $book->category_id,
            "category" => $book->category->name,
            "author_id" => $book->author_id,
            "author" => $book->author->name,
            "publisher_id" => $book->publisher_id,
            "publisher" => $book->publisher->name,
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
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

        
        $book = Book::find($request->id);
        File::delete($book->image);
        // Storage::delete($book->image);

        $book->delete();
        return;
    }
}
