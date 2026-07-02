<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WordbookResource;
use App\UseCases\Api\Wordbook\ListWordbooksUseCase;

class WordbookController extends Controller
{
	public function __construct(
		private ListWordbooksUseCase $listWordbooksUseCase,
	) {
	}

	public function index()
	{
		$wordbooks = $this->listWordbooksUseCase->execute();
		return WordbookResource::collection($wordbooks);
	}
}
