<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordbookRepositoryInterface;

class DeleteWordbookUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(int $id): void
	{
		$wordbook = $this->wordbookRepository->find($id);
		$this->wordbookRepository->delete($wordbook);
	}
}
