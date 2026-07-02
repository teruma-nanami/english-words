<?php

namespace App\Repositories;

use App\Models\Word;
use App\Interfaces\WordRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class WordRepository implements WordRepositoryInterface
{
	public function paginate(int $perPage): LengthAwarePaginator
	{
		return Word::paginate($perPage);
	}
}
