<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Fiksi', 'Sains', 'Teknologi', 'Sejarah', 'Biografi', 'Komik'];
        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
