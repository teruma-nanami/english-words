<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestRequest;
use App\Http\Resources\WordbookResource;
use App\Http\Resources\WordResource;
use App\UseCases\Api\Test\StartTestUseCase;

class TestController extends Controller
{
	public function __construct(
		private StartTestUseCase $startTestUseCase,
	) {
	}

	public function index(TestRequest $request)
	{
		$result = $this->startTestUseCase->execute($request->wordbook_id, $request->count);

		return response()->json([
			'data' => [
				'wordbook' => new WordbookResource($result['wordbook']),
				'words' => WordResource::collection($result['words']),
			],
		]);
	}
}
