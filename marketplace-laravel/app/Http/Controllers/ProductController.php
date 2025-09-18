<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Public: List all products with pagination
    public function index()
    {
        $products = Product::with(['category', 'subcategory', 'vendor', 'images'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Add full URL to images
        $products->getCollection()->transform(function ($product) {
            $product->images->map(function ($img) {
                $img->url = asset('storage/' . $img->image_path);
                return $img;
            });
            return $product;
        });

        return response()->json($products, 200);
    }

    // Authenticated: List products for management (role-based)
    public function manageIndex(Request $request)
    {
        $user = $request->user(); // Authenticated user

        $query = Product::with(['category', 'subcategory', 'vendor', 'images'])
            ->orderBy('created_at', 'desc');

        // Filter for vendor only
        if ($user->role === 'vendor') {
            $query->where('vendor_id', $user->id);
        }

        $products = $query->paginate(10);

        // Add full URL to images
        $products->getCollection()->transform(function ($product) {
            $product->images->map(function ($img) {
                $img->url = asset('storage/' . $img->image_path);
                return $img;
            });
            return $product;
        });

        return response()->json($products, 200);
    }

    // Show a single product by ID
    public function show($id)
    {
        $product = Product::with(['category', 'subcategory', 'vendor', 'images'])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->images->map(function ($img) {
            $img->url = asset('storage/' . $img->image_path);
            return $img;
        });

        return response()->json($product, 200);
    }

    // Create a new product
    public function store(Request $request)
    {
        $user = $request->user(); // currently authenticated user

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'stock' => 'sometimes|integer|min:0',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Assign the authenticated user's ID as vendor_id
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id,
            'vendor_id' => $user->id, // automatically assign logged-in user
        ]);

        // Handle images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        } else {
            // Default image
            $defaultPath = 'images/product_placeholder.png';
            $product->images()->create(['image_path' => $defaultPath]);
        }

        $product = Product::with('images')->find($product->id);
        $product->images->map(function ($img) {
            $img->url = asset('storage/' . $img->image_path);
            return $img;
        });

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
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->update($request->only(
            'name', 'description', 'price', 'stock', 'vendor_id', 'category_id', 'subcategory_id'
        ));

        // Handle new images if uploaded
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        $product = Product::with('images')->find($product->id);
        $product->images->map(function ($img) {
            $img->url = asset('storage/' . $img->image_path);
            return $img;
        });

        return response()->json($product, 200);
    }

    // Delete a product by ID
    public function destroy($id)
    {
        $product = Product::with('images')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete images from storage
        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }

        // Delete image records
        $product->images()->delete();

        // Delete product
        $product->delete();

        return response()->json(['message' => 'Product deleted'], 200);
    }
}
