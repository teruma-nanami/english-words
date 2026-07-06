<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wordbook;
use App\Models\Word;
use App\Models\User;
use RuntimeException;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
      $adminEmail = config('app.admin_email');
      $adminPassword = config('app.admin_password');

      if (! $adminEmail || ! $adminPassword) {
        throw new RuntimeException('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding.');
      }

      User::create([
        'email' => $adminEmail,
        'password' => bcrypt($adminPassword),
      ]);
			Wordbook::create([
        'name' => 'ターゲット1200'
      ]);
      Word::create([
        'english' => 'change',
        'japanese' => 'を変える',
        'part_of_speech' => '動詞'
      ]);
    }
}
