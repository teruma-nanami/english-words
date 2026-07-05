<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;
use App\Models\Word;

class ShowWordUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
	) {
	}

	public function execute(int $id): Word
	{
		return $this->wordRepository->find($id);
	}
}
