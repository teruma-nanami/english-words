<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;
use App\Models\Wordbook;
use App\Http\Requests\WordRequest;

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
}
