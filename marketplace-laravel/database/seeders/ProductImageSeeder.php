<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            // Laptops (category_id = 2)
            1 => 'products/laptop.jpg', // MacBook Pro
            2 => 'products/laptop.jpg', // Dell XPS 13
            3 => 'products/laptop.jpg', // HP Spectre x360
            4 => 'products/laptop.jpg', // Lenovo ThinkPad X1
            5 => 'products/laptop.jpg', // iMac 24"
            20 => 'products/laptop.jpg', // Asus ROG Zephyrus

            // Phones (category_id = 3)
            6 => 'products/phone.jpg', // iPhone 14
            7 => 'products/phone.jpg', // Samsung Galaxy S23
            8 => 'products/phone.jpg', // Google Pixel 8
            9 => 'products/phone.jpg', // iPhone 14 Pro Max

            // Tablets (category_id = 4)
            10 => 'products/tablet.jpeg', // Samsung Galaxy Tab S9
            11 => 'products/tablet.jpeg', // iPad Pro
            12 => 'products/tablet.jpeg', // Microsoft Surface Pro 9

            // Wearables (category_id = 6)
            13 => 'products/wearables.jpeg', // Apple Watch Series 9

            // Accessories (category_id = 5)
            14 => 'products/accessories.jpeg', // Sony WH-1000XM5
            15 => 'products/accessories.jpeg', // AirPods Pro
            16 => 'products/accessories.jpeg', // Bose QuietComfort 45
            17 => 'products/accessories.jpeg', // Apple TV 4K
            18 => 'products/accessories.jpeg', // Canon EOS R6
        ];


        foreach ($images as $productId => $imagePath) {
            // Check if product exists
            $product = Product::find($productId);
            if ($product) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath, // relative to storage/app/public
                ]);
            }
        }
    }
}
