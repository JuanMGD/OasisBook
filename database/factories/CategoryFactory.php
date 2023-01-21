<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categoryNames = ['Aventura', 'Ciencia ficción', 'Drama', 'Horror', 'Historia', 'Thriller', 'Misterio y Crimen', 'Romance', 'Biografía'];

        return [
            'name' => $this->faker->randomElement($categoryNames),
            'description' => $this->faker->text(150),
        ];
    }
}
