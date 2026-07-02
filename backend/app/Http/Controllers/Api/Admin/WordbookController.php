<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WordbookRequest;
use App\Http\Resources\WordbookResource;
use App\UseCases\Admin\CreateWordbookUseCase;
use App\UseCases\Api\Wordbook\ListWordbooksUseCase;

class WordbookController extends Controller
{
	public function __construct(
		private ListWordbooksUseCase $listWordbooksUseCase,
		private CreateWordbookUseCase $createWordbookUseCase,
	) {
	}

	public function index()
	{
		$wordbooks = $this->listWordbooksUseCase->execute();
		return WordbookResource::collection($wordbooks);
	}

	public function store(WordbookRequest $request)
	{
		$this->createWordbookUseCase->execute($request->all());
		return response()->noContent(201);
	}
}
