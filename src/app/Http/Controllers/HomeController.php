<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;
use App\Http\Requests\WordRequest;

class HomeController extends Controller
{
	public function index()
	{
		$words = Word::all();
		return view('index', compact('words'));
	}

	public function create()
	{
		return view('admin.create');
	}
	public function store(WordRequest $request)
	{
		Word::create($request->all());
		return redirect()->route('create')->with('success', '単語が追加されました');
	}

	public function test(Request $request)
	{
		$startId = $request->input('start_id');
		$endId = $request->input('end_id');
		$randomWords = Word::whereBetween('id', [$startId, $endId])->inRandomOrder()->limit(50)->get();
		return view('test', compact('randomWords'));
	}
}
