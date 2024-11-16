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
        'email' => 'adminuser@gmail.com',
        'password' => bcrypt('wordpass1412'),
      ]);
			Wordbook::create([
        'name' => 'target_1200_2020'
      ]);
      Word::create([
        'english' => 'change',
        'japanese' => 'を変える'
      ]);
    }
}
