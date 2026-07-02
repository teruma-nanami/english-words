<?php

namespace App\Http\Controllers;

use App\Models\Word;
use App\Models\Wordbook;
use App\Http\Requests\TestRequest;

class HomeController extends Controller
{
	public function index()
	{
		$words = Word::paginate(100);
		$wordbooks = Wordbook::all();
		return view('index', compact('words', 'wordbooks'));
	}

	public function test()
	{
		$wordbooks = Wordbook::all();
		return view('test', compact('wordbooks'));
	}

	public function startTest(TestRequest $request)
	{
		$wordbooks = Wordbook::all();
		$wordbook = Wordbook::find($request->wordbook_id);
		$words = $wordbook->words()->inRandomOrder()->limit($request->count)->get();

		return view('test', compact('words', 'wordbook', 'wordbooks'));
	}
}
