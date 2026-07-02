<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordbookRepositoryInterface;

class CreateWordbookUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(array $data): void
	{
		$this->wordbookRepository->create($data);
	}
}
