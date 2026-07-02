<?php

namespace App\UseCases\Admin;

use App\Interfaces\WordRepositoryInterface;
use App\Interfaces\WordbookRepositoryInterface;

class ShowWordEditFormUseCase
{
	public function __construct(
		private WordRepositoryInterface $wordRepository,
		private WordbookRepositoryInterface $wordbookRepository,
	) {
	}

	public function execute(int $id): array
	{
		$word = $this->wordRepository->find($id);
		$wordbooks = $this->wordbookRepository->all();
		$currentWordbookId = $word->wordbooks->first() ? $word->wordbooks->first()->id : null;
		$currentOrder = $word->wordbooks->first() ? $word->wordbooks->first()->pivot->order : null;

		return [
			'word' => $word,
			'wordbooks' => $wordbooks,
			'currentWordbookId' => $currentWordbookId,
			'currentOrder' => $currentOrder,
		];
	}
}
