<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "stars" => $this->faker->numberBetween(0, 5),
            "comment" => $this->faker->text(250),
            "book_id" => Book::all()->random(),
            "user_id" => User::all()->random(),
        ];
    }
}
