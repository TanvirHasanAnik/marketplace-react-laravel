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
            'name' => 'MacBook Pro 16"',
            'price' => 2500,
            'description' => '16-inch MacBook Pro with M1 chip',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 10,
        ]);

        Product::create([
            'name' => 'Dell XPS 13',
            'price' => 1800,
            'description' => '13-inch Dell XPS laptop',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 8,
        ]);

        Product::create([
            'name' => 'HP Spectre x360',
            'price' => 1500,
            'description' => 'Convertible laptop HP Spectre',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 6,
        ]);

        Product::create([
            'name' => 'Lenovo ThinkPad X1',
            'price' => 1600,
            'description' => 'Business laptop Lenovo ThinkPad',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 8,
        ]);

        Product::create([
            'name' => 'iMac 24"',
            'price' => 2000,
            'description' => '24-inch Apple iMac',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 5,
        ]);

        // Electronics - Phones
        Product::create([
            'name' => 'iPhone 14',
            'price' => 1200,
            'description' => 'Latest iPhone 14 smartphone',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 2,
            'stock' => 5,
        ]);

        Product::create([
            'name' => 'Samsung Galaxy S23',
            'price' => 1000,
            'description' => 'Latest Samsung flagship phone',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 2,
            'stock' => 7,
        ]);

        Product::create([
            'name' => 'Google Pixel 8',
            'price' => 900,
            'description' => 'Latest Google Pixel phone',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 2,
            'stock' => 6,
        ]);

        Product::create([
            'name' => 'iPhone 14 Pro Max',
            'price' => 1400,
            'description' => 'High-end iPhone',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 2,
            'stock' => 5,
        ]);

        Product::create([
            'name' => 'Samsung Galaxy Tab S9',
            'price' => 800,
            'description' => 'Samsung flagship tablet',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 3,
            'stock' => 10,
        ]);

        Product::create([
            'name' => 'iPad Pro',
            'price' => 900,
            'description' => '12.9-inch iPad Pro tablet',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 3,
            'stock' => 12,
        ]);

        Product::create([
            'name' => 'Microsoft Surface Pro 9',
            'price' => 1300,
            'description' => 'Microsoft tablet/laptop hybrid',
            'vendor_id' => 1,
            'category_id' => 2,
            'subcategory_id' => 3,
            'stock' => 7,
        ]);

        // Electronics - Watches
        Product::create([
            'name' => 'Apple Watch Series 9',
            'price' => 500,
            'description' => 'Latest Apple Watch',
            'vendor_id' => 1,
            'category_id' => 3,
            'subcategory_id' => 4,
            'stock' => 15,
        ]);

        // Electronics - Headphones
        Product::create([
            'name' => 'Sony WH-1000XM5',
            'price' => 350,
            'description' => 'Noise-cancelling headphones',
            'vendor_id' => 1,
            'category_id' => 4,
            'subcategory_id' => 5,
            'stock' => 20,
        ]);

        Product::create([
            'name' => 'AirPods Pro',
            'price' => 250,
            'description' => 'Apple wireless earbuds',
            'vendor_id' => 1,
            'category_id' => 4,
            'subcategory_id' => 5,
            'stock' => 25,
        ]);

        Product::create([
            'name' => 'Bose QuietComfort 45',
            'price' => 330,
            'description' => 'Bose noise-cancelling headphones',
            'vendor_id' => 1,
            'category_id' => 4,
            'subcategory_id' => 5,
            'stock' => 12,
        ]);

        // Electronics - TV / Streaming
        Product::create([
            'name' => 'Apple TV 4K',
            'price' => 200,
            'description' => 'Apple streaming device',
            'vendor_id' => 1,
            'category_id' => 5,
            'subcategory_id' => 6,
            'stock' => 15,
        ]);

        // Electronics - Cameras
        Product::create([
            'name' => 'Canon EOS R6',
            'price' => 2500,
            'description' => 'Full-frame mirrorless camera',
            'vendor_id' => 1,
            'category_id' => 4,
            'subcategory_id' => 7,
            'stock' => 3,
        ]);

        // Gaming / Laptops
        Product::create([
            'name' => 'Asus ROG Zephyrus',
            'price' => 2200,
            'description' => 'Gaming laptop Asus',
            'vendor_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 1,
            'stock' => 4,
        ]);
    }
}
