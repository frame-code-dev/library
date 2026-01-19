<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Member;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BorrowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $member = Member::first();
        $book = Book::first();
        $petugas = User::role('petugas')->first();

        Borrow::create([
            'member_id' => $member->id,
            'book_id' => $book->id,
            'user_id' => $petugas->id,
            'borrowed_at' => Carbon::now(),
            'due_at' => Carbon::now()->addDays(7),
            'status' => 'borrowed',
        ]);

        // Reduce stock
        $book->decrement('stock');
    }
}
