<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Member;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Chart data: borrowing per-day for the last 14 days
        $chartData = Borrow::select(DB::raw('DATE(borrowed_at) as date'), DB::raw('count(*) as count'))
            ->where('borrowed_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'name' => Carbon::parse($item->date)->format('d M'),
                'total' => $item->count,
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'total_books' => Book::count(),
                'available_books' => (int) Book::sum('stock'),
                'borrowed_books' => Borrow::where('status', 'borrowed')->count(),
                'total_members' => Member::count(),
                'total_users' => User::count(),
                'total_fines' => (float) Borrow::where('status', 'returned')->sum('fine_amount'),
            ],
            'chart_data' => $chartData,
            'recent_borrows' => Borrow::with(['member', 'book'])->latest()->take(10)->get(),
        ]);
    }
}
