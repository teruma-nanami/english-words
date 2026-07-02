<?php

namespace App\Providers;

use App\Interfaces\WordRepositoryInterface;
use App\Interfaces\WordbookRepositoryInterface;
use App\Repositories\WordRepository;
use App\Repositories\WordbookRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(WordRepositoryInterface::class, WordRepository::class);
        $this->app->bind(WordbookRepositoryInterface::class, WordbookRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
