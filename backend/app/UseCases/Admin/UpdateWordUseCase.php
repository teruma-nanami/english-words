<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;

class UpdateWordUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(int $id, array $wordData, ?int $wordbookId = null, ?int $order = null): void
	{
		$word = $this->wordRepository->find($id);
		$this->wordRepository->update($word, $wordData);

		if ($wordbookId !== null && $order !== null) {
			$this->wordRepository->syncWordbookWithoutDetaching($word, $wordbookId, $order);
		}
	}
}
