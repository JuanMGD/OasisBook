<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $imgURLs = ['https://m.media-amazon.com/images/I/71YoFJSz3LL.jpg', 'https://m.media-amazon.com/images/I/81YPlYG-b9L.jpg', 'https://m.media-amazon.com/images/I/81ItYmT-50L.jpg', 'https://m.media-amazon.com/images/I/51E1+pWVJqL._AC_SY780_.jpg', 'https://m.media-amazon.com/images/I/91g5uc-gtML.jpg', 'https://m.media-amazon.com/images/I/41GbnSk84WL.jpg', 'https://m.media-amazon.com/images/I/81ffybroivL.jpg', 'https://m.media-amazon.com/images/I/51SH9vHXgtL.jpg', 'https://m.media-amazon.com/images/I/81UUK4M0SoL.jpg', 'https://m.media-amazon.com/images/I/71C0BAef6hL.jpg'];

        return [
            "title" => $this->faker->words(3, true),
            "description" => $this->faker->text(150),
            "price" => $this->faker->randomFloat(2, 1, 500),
            "stock" => $this->faker->randomNumber(2, false),
            "image" => $this->faker->randomElement($imgURLs),//$this->faker->imageUrl(225, 350, 'books', true),
            "category_id" => Category::all()->random(),
            "author_id" => Author::all()->random(),
            "publisher_id" => Publisher::all()->random(),
        ];
    }
}
