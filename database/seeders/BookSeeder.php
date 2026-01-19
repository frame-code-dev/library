<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fiksi = Category::where('name', 'Fiksi')->first();
        $sains = Category::where('name', 'Sains')->first();

        Book::create([
            'title' => 'Laskar Pelangi',
            'author' => 'Andrea Hirata',
            'isbn' => '9789793062791',
            'category_id' => $fiksi->id,
            'stock' => 10,
            'rack_location' => 'A1',
        ]);

        Book::create([
            'title' => 'Bumi',
            'author' => 'Tere Liye',
            'isbn' => '9786020304670',
            'category_id' => $fiksi->id,
            'stock' => 5,
            'rack_location' => 'A2',
        ]);

        Book::create([
            'title' => 'A Brief History of Time',
            'author' => 'Stephen Hawking',
            'isbn' => '9780553109580',
            'category_id' => $sains->id,
            'stock' => 3,
            'rack_location' => 'B1',
        ]);
    }
}
