<?php

namespace App\UseCases\Word;

use App\Interfaces\WordRepositoryInterface;
use App\Interfaces\WordbookRepositoryInterface;

class ListWordsUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(): array
	{
		return [
			'words' => $this->wordRepository->paginate(100),
			'wordbooks' => $this->wordbookRepository->all(),
		];
	}
}
