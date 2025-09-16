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
        Subcategory::create(['name' => 'MacBooks', 'category_id' => 1]);
        Subcategory::create(['name' => 'iPhones', 'category_id' => 2]);
    }
}
