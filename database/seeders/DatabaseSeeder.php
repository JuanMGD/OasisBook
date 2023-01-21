<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Filesystem\Filesystem;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $file = new FileSystem;
        // $file->cleanDirectory('./storage/app/covers');
        
        // \App\Models\User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            PublisherSeeder::class,
            AuthorSeeder::class,
            UserSeeder::class,
            BookSeeder::class,
            SaleSeeder::class,
            // RatingSeeder::class,
            WishlistSeeder::class
        ]);
    }
}
