<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function ratings() 
    {
        return $this->hasMany(Rating::class);
    }

    public function wishlists() 
    {
        return $this->hasMany(Wishlist::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
