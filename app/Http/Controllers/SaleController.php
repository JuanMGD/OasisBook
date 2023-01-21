<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SaleController extends Controller
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

        $sales = [];        

        foreach (Sale::orderBy('date', 'desc')->groupBy('date','user_id')->selectRaw('user_id, date, sum(amount) as amount')->get() as $sale) {
            $sales[] = [
                "amount" => $sale->amount,
                'date' => $sale->date,
                // 'user_id' => $sale->user_id,
                'name' => $sale->user->name,
            ];
        }

        return response()->json($sales);
    }
    
    // public function showUserPurchases(Request $request)
    // {
    //     $purchases = [];

    //     foreach (Sale::all()->where('user_id', $request->user_id)->groupBy('book_id') as $purchase) {
    //         // $book = $purchase->book;
    //         // $bookRating = $book->ratings()->where('user_id', $request->user_id)->first();
    //         // $purchases[] = [
    //         //     "book_id" => $book->id,
    //         //     "book_title" => $book->title,
    //         //     "book_description" => $book->description,
    //         //     "book_price" => $book->price,
    //         //     "book_image" => $book->image,
    //         //     "book_author" => $book->author->name,
    //         //     "book_category" => $book->category->name,
    //         //     "book_rating" => $bookRating ? $bookRating->get(['stars', 'comment']) : null,
    //         // ];
    //         $purchases[] = $purchase;
    //     }

    //     return response()->json($purchases);
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
            'quantity' => 'required|integer|min:1',
            'amount' => 'required|numeric|min:1',
            'user_id' => 'required|integer',
            'book_id' => 'required|integer',
        ]);

        $item = new Sale();
        $item->quantity = $request->quantity;
        $item->amount = $request->amount;
        $item->date = Carbon::now();
        $item->user_id = $request->user_id;
        $item->book_id = $request->book_id;
        $item->save();
        return $item;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
