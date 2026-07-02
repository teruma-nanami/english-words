<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;
use App\Models\Wordbook;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\WordbookRequest;

class AdminController extends Controller
{
	public function list()
	{
		$words = Word::paginate(100);
		$wordbooks = Wordbook::all();
		return view('admin.list', compact('words', 'wordbooks'));
	}
	public function edit($id)
	{
		$word = Word::find($id);
		$wordbooks = Wordbook::all();
		$currentWordbookId = $word->wordbooks->first() ? $word->wordbooks->first()->id : null;
		$currentOrder = $word->wordbooks->first() ? $word->wordbooks->first()->pivot->order : null;
		return view('admin.edit', compact('word', 'wordbooks', 'currentWordbookId', 'currentOrder'));
	}

	public function update(AdminRequest $request, $id)
	{
		$word = Word::find($id);
		$word->update($request->only(['english', 'japanese', 'part_of_speech']));
		$wordbookId = $request->input('wordbook_id');
		$order = $request->input('order');
		$word->wordbooks()->syncWithoutDetaching([$wordbookId => ['order' => $order]]);
		return redirect()->route('list')->with('success', '単語帳への紐づけが変更されました');
	}
	public function selectWordbook()
	{
		$wordbooks = Wordbook::all();
		return view('admin.select-wordbook', compact('wordbooks'));
	}

	public function create()
	{
		$wordbooks = Wordbook::all();
		return view('admin.create', compact('wordbooks'));
	}
	public function store(AdminRequest $request)
	{
		$word = Word::firstOrCreate([
			'english' => $request->english,
			'japanese' => $request->japanese,
			'part_of_speech' => $request->part_of_speech,
		]);
		// 単語帳に単語を追加
		$wordbookId = $request->input('wordbook_id');
		$order = $request->input('order');
		$word->wordbooks()->attach($wordbookId, ['order' => $order]);
		return redirect()->route('create', ['wordbook_id' => $wordbookId])->with('success', '単語を追加しました');
	}
	public function add()
	{
		return view('admin.add');
	}
	public function books(WordbookRequest $request)
	{
		Wordbook::create($request->all());
		return redirect()->route('list')->with('success', '単語帳を追加しました');
	}
}
