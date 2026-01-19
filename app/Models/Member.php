<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name',
        'email',
        'gender',
        'type',
        'class_or_position',
    ];

    public function borrows()
    {
        return $this->hasMany(Borrow::class);
    }
}
