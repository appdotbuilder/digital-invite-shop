<?php

use App\Http\Controllers\InvitationTemplateController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    $templates = \App\Models\InvitationTemplate::active()
        ->take(6)
        ->get();
    
    return Inertia::render('welcome', [
        'templates' => $templates
    ]);
})->name('home');

// Public template browsing
Route::controller(InvitationTemplateController::class)->group(function () {
    Route::get('/templates', 'index')->name('templates.index');
    Route::get('/templates/{invitationTemplate}', 'show')->name('templates.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $recentOrders = $user->orders()
            ->with('invitationTemplate')
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'recentOrders' => $recentOrders
        ]);
    })->name('dashboard');
    
    // Order management
    Route::resource('orders', OrderController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
