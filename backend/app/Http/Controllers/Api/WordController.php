<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WordResource;
use App\UseCases\Api\Word\ListWordsUseCase;

class WordController extends Controller
{
	public function __construct(
		private ListWordsUseCase $listWordsUseCase,
	) {
	}

	public function index()
	{
		$words = $this->listWordsUseCase->execute();
		return WordResource::collection($words);
	}
}
