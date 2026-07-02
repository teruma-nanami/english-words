<?php

namespace App\Interfaces;

use Illuminate\Pagination\LengthAwarePaginator;

interface WordRepositoryInterface
{
	public function paginate(int $perPage): LengthAwarePaginator;
}
