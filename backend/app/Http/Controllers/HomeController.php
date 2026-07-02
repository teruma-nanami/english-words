<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestRequest;
use App\UseCases\Test\ShowTestFormUseCase;
use App\UseCases\Test\StartTestUseCase;
use App\UseCases\Word\ListWordsUseCase;

class HomeController extends Controller
{
	public function __construct(
		private ListWordsUseCase $listWordsUseCase,
		private ShowTestFormUseCase $showTestFormUseCase,
		private StartTestUseCase $startTestUseCase,
	) {
	}

	public function index()
	{
		$data = $this->listWordsUseCase->execute();
		return view('index', $data);
	}

	public function test()
	{
		$data = $this->showTestFormUseCase->execute();
		return view('test', $data);
	}

	public function startTest(TestRequest $request)
	{
		$data = $this->startTestUseCase->execute($request->wordbook_id, $request->count);
		return view('test', $data);
	}
}
