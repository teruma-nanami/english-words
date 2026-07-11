<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WordIndexRequest;
use App\Http\Resources\WordResource;
use App\UseCases\Api\Word\ListWordsUseCase;

class WordController extends Controller
{
	public function __construct(
		private ListWordsUseCase $listWordsUseCase,
	) {
	}

	public function index(WordIndexRequest $request)
	{
		$words = $this->listWordsUseCase->execute(
			$request->validated('part_of_speech'),
			$request->validated('wordbook_id'),
			$request->validated('keyword'),
		);
		return WordResource::collection($words);
	}
}
