<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordbookRepositoryInterface;

class UpdateWordbookUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(int $id, array $data): void
	{
		$wordbook = $this->wordbookRepository->find($id);
		$this->wordbookRepository->update($wordbook, $data);
	}
}
