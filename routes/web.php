<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // User Management (Admin only)
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class)->except(['show', 'create', 'edit']);
        Route::get('settings/library', [SettingController::class, 'index'])->name('settings.library');
        Route::post('settings/library', [SettingController::class, 'update'])->name('settings.library.update');
    });

    // Library Resources (Admin & Petugas)
    Route::middleware(['role:admin|petugas'])->group(function () {
        Route::resource('books', BookController::class);
        Route::resource('members', MemberController::class);
        Route::resource('borrows', BorrowController::class)->only(['index', 'create', 'store']);
        Route::get('borrows/{borrow}/receipt', [BorrowController::class, 'printReceipt'])->name('borrows.receipt');
        Route::get('borrows/export', [BorrowController::class, 'exportHistory'])->name('borrows.export');
        Route::post('borrows/{borrow}/return', [BorrowController::class, 'returnBook'])->name('borrows.return');
    });
});

require __DIR__.'/settings.php';
