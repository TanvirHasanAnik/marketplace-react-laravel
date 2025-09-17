<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::updateOrCreate(['name' => 'Others']);
        Category::updateOrCreate(['name' => 'Laptops']);
        Category::updateOrCreate(['name' => 'Phones']);
        Category::updateOrCreate(['name' => 'Tablets']);
        Category::updateOrCreate(['name' => 'Accessories']);
        Category::updateOrCreate(['name' => 'Wearables']);
    }
}
