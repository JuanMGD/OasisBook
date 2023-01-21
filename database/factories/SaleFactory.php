<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "quantity" => $this->faker->numberBetween(1, 3),
            "amount" => $this->faker->randomFloat(2, 1, 3000),
            "date" => $this->faker->dateTimeThisYear(),
            "user_id" => User::all()->random(),
            "book_id" => Book::all()->random(),
        ];
    }
}
