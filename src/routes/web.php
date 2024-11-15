<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/1200/create', [HomeController::class, 'create'])->name('create');
Route::post('/1200', [HomeController::class, 'store'])->name('store');
Route::get('/1200/test', [HomeController::class, 'test'])->name('test');

