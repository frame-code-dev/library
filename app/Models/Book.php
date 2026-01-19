<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'category_id',
        'cover_image',
        'stock',
        'rack_location',
    ];

    protected $appends = ['cover_image_url'];

    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image 
            ? asset('storage/' . $this->cover_image) 
            : 'https://placehold.co/400x600?text=No+Cover';
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function borrows()
    {
        return $this->hasMany(Borrow::class);
    }
}
