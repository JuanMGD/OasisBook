<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->jobTitle(),
            'allow_read' => $this->faker->boolean(),
            'allow_write' => $this->faker->boolean(),
            'allow_delete' => $this->faker->boolean(),
            'allow_manage_users' => $this->faker->boolean(),
            'allow_manage_roles' => $this->faker->boolean(),
        ];
    }

    public function isAdmin()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => "Administrador",
                'allow_read' => 1,
                'allow_write' => 1,
                'allow_delete' => 1,
                'allow_manage_users' => 1,
                'allow_manage_roles' => 1,
            ];
        });
    }
}
