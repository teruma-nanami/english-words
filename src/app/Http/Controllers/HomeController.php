<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;
use App\Models\Wordbook;

class HomeController extends Controller
{
	public function index()
	{
		$words = Word::paginate(100);
		$wordbooks = Wordbook::all();
		return view('index', compact('words', 'wordbooks'));
	}

	public function test(Request $request)
	{
		$startId = $request->input('start_id');
		$endId = $request->input('end_id');
		$randomWords = Word::whereBetween('id', [$startId, $endId])->inRandomOrder()->limit(50)->get();
		return view('test', compact('randomWords'));
	}

	public function startTest(Request $request)
	{
		// 入力されたID範囲を取得
		$startId = $request->input('start_id');
		$endId = $request->input('end_id');

		// データベースから指定範囲の単語を取得しランダムに並び替える
		$words = Word::whereBetween('id', [$startId, $endId])->inRandomOrder()->limit(50)->get();

		return view('test', compact('words', 'startId', 'endId'));
	}
}
