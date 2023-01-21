<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    // public function showBookRatings(Request $request)
    // {
    //     $ratings = [];

    //     foreach (Rating::all()->where('book_id', $request->book_id) as $rating) {
    //         $ratings[] = [
    //             "id" => $rating->id,
    //             "rating" => $rating->rating,
    //             "comment" => $rating->comment,
    //         ];
    //     }

    //     return response()->json($ratings);
    // }

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'stars' => 'required|integer|min:0|max:5',
            'comment' => 'nullable|max:250',
            // 'user_id' => 'required|integer',
            'book_id' => 'required|integer',
        ]);

        $user_id = auth('api')->user()->id;

        $rating = new Rating();
        $rating->stars = $request->stars;
        $rating->comment = $request->comment;
        $rating->user_id = $user_id;
        $rating->book_id = $request->book_id;
        $rating->save();
        return $rating;
    }

    public function update(Request $request, Rating $rating)
    {
        $this->validate($request, [
            'id' => 'required|integer',
            'stars' => 'required|integer|min:0|max:5',
            'comment' => 'nullable|max:250',
        ]);

        $rating = Rating::find($request->id);
        $rating->stars = $request->stars;
        $rating->comment = $request->comment;
        $rating->save();
        return $rating;
    }
}
