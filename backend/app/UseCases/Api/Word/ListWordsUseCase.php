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

	public function execute(?string $partOfSpeech, ?int $wordbookId, ?string $keyword, ?int $perPage): LengthAwarePaginator
	{
		return $this->wordRepository->paginate($perPage ?? 30, $partOfSpeech, $wordbookId, $keyword);
	}
}
