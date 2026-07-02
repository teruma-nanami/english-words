<?php

namespace App\UseCases\Api\Test;

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
		$words = $this->wordbookRepository->getRandomWords($wordbook, $count);

		return [
			'wordbook' => $wordbook,
			'words' => $words,
		];
	}
}
