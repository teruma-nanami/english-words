<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WordbookRequest;
use App\Http\Resources\WordbookResource;
use App\Models\Wordbook;
use App\UseCases\Admin\CreateWordbookUseCase;
use App\UseCases\Admin\DeleteWordbookUseCase;
use App\UseCases\Admin\UpdateWordbookUseCase;
use App\UseCases\Api\Wordbook\ListWordbooksUseCase;

class WordbookController extends Controller
{
	public function __construct(
		private ListWordbooksUseCase $listWordbooksUseCase,
		private CreateWordbookUseCase $createWordbookUseCase,
		private UpdateWordbookUseCase $updateWordbookUseCase,
		private DeleteWordbookUseCase $deleteWordbookUseCase,
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

	public function update(WordbookRequest $request, Wordbook $wordbook)
	{
		$this->updateWordbookUseCase->execute($wordbook->id, $request->all());
		return response()->noContent();
	}

	public function destroy(Wordbook $wordbook)
	{
		$this->deleteWordbookUseCase->execute($wordbook->id);
		return response()->noContent();
	}
}
