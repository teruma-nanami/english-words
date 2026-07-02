<?php

namespace App\UseCases\Test;

use App\Interfaces\WordbookRepositoryInterface;

class StartTestUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(int $wordbookId, int $count): array
	{
		$wordbook = $this->wordbookRepository->find($wordbookId);
		$wordbooks = $this->wordbookRepository->all();
		$words = $this->wordbookRepository->getRandomWords($wordbook, $count);

		return [
			'words' => $words,
			'wordbook' => $wordbook,
			'wordbooks' => $wordbooks,
		];
	}
}
