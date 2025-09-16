<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\product;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'MacBook Pro',
            'price' => 2500,
            'description' => '16-inch MacBook Pro',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 10,
        ]);

        Product::create([
            'name' => 'iPhone 14',
            'price' => 1200,
            'description' => 'Latest iPhone',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 2,
            'stock' => 5,
        ]);
    }
}
