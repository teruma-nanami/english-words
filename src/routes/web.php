<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;

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
Route::get('/test', [HomeController::class, 'test'])->name('test');

Route::middleware(['auth'])->group(function () {
  Route::get('/list', [AdminController::class, 'list'])->name('list');
  Route::get('/edit/{id}', [AdminController::class, 'edit'])->name('edit');
  Route::put('/edit/{id}', [AdminController::class, 'update'])->name('update');
  Route::get('/create', [AdminController::class, 'create'])->name('create');
  Route::post('/create', [AdminController::class, 'store'])->name('store');
  Route::get('/add', [AdminController::class, 'add'])->name('add');
  Route::post('/add', [AdminController::class, 'books'])->name('books');
  });