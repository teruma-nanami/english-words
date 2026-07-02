<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Resources\WordResource;
use App\Models\Word;
use App\UseCases\Admin\CreateWordUseCase;
use App\UseCases\Admin\DeleteWordUseCase;
use App\UseCases\Admin\UpdateWordUseCase;
use App\UseCases\Api\Word\ListWordsUseCase;

class WordController extends Controller
{
	public function __construct(
		private ListWordsUseCase $listWordsUseCase,
		private CreateWordUseCase $createWordUseCase,
		private UpdateWordUseCase $updateWordUseCase,
		private DeleteWordUseCase $deleteWordUseCase,
	) {
	}

	public function index()
	{
		$words = $this->listWordsUseCase->execute();
		return WordResource::collection($words);
	}

	public function store(AdminRequest $request)
	{
		$wordData = [
			'english' => $request->english,
			'japanese' => $request->japanese,
			'part_of_speech' => $request->part_of_speech,
		];
		$this->createWordUseCase->execute($wordData, $request->wordbook_id, $request->order);
		return response()->noContent(201);
	}

	public function update(AdminRequest $request, Word $word)
	{
		$wordData = $request->only(['english', 'japanese', 'part_of_speech']);
		$this->updateWordUseCase->execute($word->id, $wordData, $request->wordbook_id, $request->order);
		return response()->noContent();
	}

	public function destroy(Word $word)
	{
		$this->deleteWordUseCase->execute($word->id);
		return response()->noContent();
	}
}
