<?php

namespace App\UseCases\Api\Test;

use App\Interfaces\WordbookRepositoryInterface;

class StartTestUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(int $wordbookId, string $mode, int $count, ?int $startWordId): array
	{
		$wordbook = $this->wordbookRepository->find($wordbookId);
		$words = $mode === 'sequential'
			? $this->wordbookRepository->getSequentialWords($wordbook, $startWordId, $count)
			: $this->wordbookRepository->getRandomWords($wordbook, $count);

		return [
			'wordbook' => $wordbook,
			'words' => $words,
		];
	}
}
