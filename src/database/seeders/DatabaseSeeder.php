<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wordbook;
use App\Models\Word;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
      User::create([
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
      ]);
			Wordbook::create([
        'name' => 'ターゲット1200'
      ]);
      Word::create([
        'english' => 'change',
        'japanese' => 'を変える'
      ]);
    }
}
