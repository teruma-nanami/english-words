<?php

namespace App\UseCases\Api\Word;

use App\Interfaces\WordRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ListWordsUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(): LengthAwarePaginator
	{
		return $this->wordRepository->paginate(100);
	}
}
