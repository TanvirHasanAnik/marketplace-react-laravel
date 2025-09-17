<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\subcategory;
class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subcategory::updateOrCreate(['name' => 'Others', 'category_id' => 1]);

        // Laptops (category_id = 2)
        Subcategory::updateOrCreate(['name' => 'MacBooks', 'category_id' => 2]);
        Subcategory::updateOrCreate(['name' => 'Gaming Laptops', 'category_id' => 2]);

        // Phones (category_id = 3)
        Subcategory::updateOrCreate(['name' => 'iPhones', 'category_id' => 3]);
        Subcategory::updateOrCreate(['name' => 'Android Phones', 'category_id' => 3]);

        // Tablets (category_id = 4)
        Subcategory::updateOrCreate(['name' => 'iPads', 'category_id' => 4]);
        Subcategory::updateOrCreate(['name' => 'Android Tablets', 'category_id' => 4]);

        // Accessories (category_id = 5)
        Subcategory::updateOrCreate(['name' => 'Headphones', 'category_id' => 5]);
        Subcategory::updateOrCreate(['name' => 'Chargers', 'category_id' => 5]);

        // Wearables (category_id = 6)
        Subcategory::updateOrCreate(['name' => 'Smart Watches', 'category_id' => 6]);
        Subcategory::updateOrCreate(['name' => 'Fitness Bands', 'category_id' => 6]);

    }
}
