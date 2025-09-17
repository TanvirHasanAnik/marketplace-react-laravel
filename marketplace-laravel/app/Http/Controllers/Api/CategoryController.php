<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        // Return categories with id and name
        $categories = Category::orderBy('id', 'asc')->get(['id', 'name']);
        return response()->json($categories);
    }
}
