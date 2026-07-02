<?php

use App\Http\Controllers\Api\Admin\WordbookController as AdminWordbookController;
use App\Http\Controllers\Api\Admin\WordController as AdminWordController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\WordbookController;
use App\Http\Controllers\Api\WordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/words', [WordController::class, 'index'])->name('api.words.index');
Route::get('/wordbooks', [WordbookController::class, 'index'])->name('api.wordbooks.index');
Route::get('/test', [TestController::class, 'index'])->name('api.test.index');

Route::middleware('auth:sanctum')->prefix('admin')->name('api.admin.')->group(function () {
    Route::get('/words', [AdminWordController::class, 'index'])->name('words.index');
    Route::post('/words', [AdminWordController::class, 'store'])->name('words.store');
    Route::put('/words/{word}', [AdminWordController::class, 'update'])->name('words.update');
    Route::delete('/words/{word}', [AdminWordController::class, 'destroy'])->name('words.destroy');
    Route::get('/wordbooks', [AdminWordbookController::class, 'index'])->name('wordbooks.index');
    Route::post('/wordbooks', [AdminWordbookController::class, 'store'])->name('wordbooks.store');
});
