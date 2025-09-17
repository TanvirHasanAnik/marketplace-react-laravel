<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Columns that can be mass-assigned
    protected $fillable = [
        'name',
        'price',
        'description',
        'vendor_id',
        'category_id',
        'subcategory_id',
        'stock',
    ];

    // Relationships

    // Product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Product belongs to a subcategory
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    // Product belongs to a vendor (user)
    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }
    
    public function images() {
        return $this->hasMany(ProductImage::class);
    }
}
