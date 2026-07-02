<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;

class DeleteWordUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(int $id): void
	{
		$word = $this->wordRepository->find($id);
		$this->wordRepository->delete($word);
	}
}
