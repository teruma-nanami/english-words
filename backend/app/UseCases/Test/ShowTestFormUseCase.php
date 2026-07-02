<?php

namespace App\UseCases\Test;

use App\Interfaces\WordbookRepositoryInterface;

class ShowTestFormUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(): array
	{
		return [
			'wordbooks' => $this->wordbookRepository->all(),
		];
	}
}
