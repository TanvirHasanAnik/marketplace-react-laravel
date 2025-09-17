<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
                'role' => 'admin',
            ]
        );

        $vendor = User::firstOrCreate(
            ['email' => 'vendor@example.com'],
            [
                'name' => 'Vendor User',
                'password' => bcrypt('password123'),
                'role' => 'vendor',
            ]
        );

        // 🔑 Delete old tokens so we only keep the latest
        $admin->tokens()->delete();
        $vendor->tokens()->delete();

        // create fresh tokens
        $adminToken = $admin->createToken('admin-token', ['admin'])->plainTextToken;
        $vendorToken = $vendor->createToken('vendor-token', ['vendor'])->plainTextToken;

        dump('Admin Token: ' . $adminToken);
        dump('Vendor Token: ' . $vendorToken);
    }
}
