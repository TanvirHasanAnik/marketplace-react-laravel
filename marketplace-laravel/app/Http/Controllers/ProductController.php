<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        $products = Product::with(['category', 'subcategory', 'vendor'])->get();
        return response()->json($products, 200);
    }

    // Show a single product by ID
    public function show($id)
    {
        $product = Product::with(['category', 'subcategory', 'vendor'])->find($id);
        if ($product) {
            return response()->json($product, 200);
        }
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Create a new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'vendor_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'stock' => 'sometimes|integer|min:0',
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    // Update a product by ID
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'description' => 'nullable|string',
            'vendor_id' => 'sometimes|required|exists:users,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'stock' => 'sometimes|integer|min:0',
        ]);

        $product->update($request->all());

        return response()->json($product, 200);
    }

    // Delete a product by ID
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted'], 200);
    }
}
