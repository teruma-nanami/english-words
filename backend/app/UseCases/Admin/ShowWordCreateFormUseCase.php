<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordbookRepositoryInterface;

class ShowWordCreateFormUseCase
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
