<?php

namespace App\UseCases\Api\Wordbook;

use App\Interfaces\WordbookRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ListWordbooksUseCase
{
	public function __construct(
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(): Collection
	{
		return $this->wordbookRepository->all();
	}
}
