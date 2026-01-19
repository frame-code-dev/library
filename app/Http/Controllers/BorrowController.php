<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class BorrowController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Borrows/Index', [
            'borrows' => Borrow::with(['member', 'book', 'user'])->latest()->paginate(10),
            'filters' => $request->only(['search']),
            'fine_per_day' => Setting::getValue('fine_per_day', 0),
        ]);
    }

    public function printReceipt(Borrow $borrow)
    {
        $borrow->load(['member', 'book', 'user']);
        $pdf = Pdf::loadView('pdf.borrow-receipt', compact('borrow'));
        
        return $pdf->stream("receipt-borrow-{$borrow->id}.pdf");
    }

    public function exportHistory(Request $request)
    {
        $borrows = Borrow::with(['member', 'book', 'user'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('member', fn($q) => $q->where('name', 'like', "%{$search}%"))
                      ->orWhereHas('book', fn($q) => $q->where('title', 'like', "%{$search}%"));
            })
            ->latest()
            ->get();

        $pdf = Pdf::loadView('pdf.borrow-history', compact('borrows'));
        
        return $pdf->stream("riwayat-peminjaman.pdf");
    }
    
    // ... rest of the functions ...

    public function returnBook(Borrow $borrow)
    {
        DB::transaction(function () use ($borrow) {
            $now = Carbon::now();
            $fineAmount = 0;

            if ($now->greaterThan($borrow->due_at)) {
                $daysLate = $now->diffInDays($borrow->due_at);
                $finePerDay = Setting::getValue('fine_per_day', 0);
                $fineAmount = $daysLate * (int)$finePerDay;
            }

            $borrow->update([
                'returned_at' => $now,
                'status' => 'returned',
                'fine_amount' => $fineAmount,
            ]);

            $borrow->book->increment('stock');
        });

        return redirect()->route('borrows.index')->with('success', 'Buku berhasil dikembalikan' . ($borrow->fine_amount > 0 ? " dengan denda Rp " . number_format($borrow->fine_amount) : ""));
    }
}
