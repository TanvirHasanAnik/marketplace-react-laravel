<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subcategory;

class SubcategoryController extends Controller
{
    public function index()
    {
        // Return subcategories with id, name, and category_id
        $subcategories = Subcategory::orderBy('category_id', 'asc')
                                    ->orderBy('id', 'asc')
                                    ->get(['id', 'name', 'category_id']);
        return response()->json($subcategories);
    }
}
