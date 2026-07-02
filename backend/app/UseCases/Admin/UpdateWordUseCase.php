<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;

class UpdateWordUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(int $id, array $wordData, int $wordbookId, int $order): void
	{
		$word = $this->wordRepository->find($id);
		$this->wordRepository->update($word, $wordData);
		$this->wordRepository->syncWordbookWithoutDetaching($word, $wordbookId, $order);
	}
}
