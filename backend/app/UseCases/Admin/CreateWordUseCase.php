<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;

class CreateWordUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(array $wordData, int $wordbookId, int $order): void
	{
		$word = $this->wordRepository->firstOrCreate($wordData);
		$this->wordRepository->attachWordbook($word, $wordbookId, $order);
	}
}
