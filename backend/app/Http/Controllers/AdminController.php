<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequest;
use App\Http\Requests\WordbookRequest;
use App\UseCases\Admin\CreateWordbookUseCase;
use App\UseCases\Admin\CreateWordUseCase;
use App\UseCases\Admin\ShowWordbookSelectionFormUseCase;
use App\UseCases\Admin\ShowWordCreateFormUseCase;
use App\UseCases\Admin\ShowWordEditFormUseCase;
use App\UseCases\Admin\UpdateWordUseCase;
use App\UseCases\Word\ListWordsUseCase;

class AdminController extends Controller
{
	public function __construct(
		private ListWordsUseCase $listWordsUseCase,
		private ShowWordEditFormUseCase $showWordEditFormUseCase,
		private UpdateWordUseCase $updateWordUseCase,
		private ShowWordbookSelectionFormUseCase $showWordbookSelectionFormUseCase,
		private ShowWordCreateFormUseCase $showWordCreateFormUseCase,
		private CreateWordUseCase $createWordUseCase,
		private CreateWordbookUseCase $createWordbookUseCase,
	) {
	}

	public function list()
	{
		$data = $this->listWordsUseCase->execute();
		return view('admin.list', $data);
	}
	public function edit($id)
	{
		$data = $this->showWordEditFormUseCase->execute($id);
		return view('admin.edit', $data);
	}

	public function update(AdminRequest $request, $id)
	{
		$wordData = $request->only(['english', 'japanese', 'part_of_speech']);
		$wordbookId = $request->input('wordbook_id');
		$order = $request->input('order');
		$this->updateWordUseCase->execute($id, $wordData, $wordbookId, $order);
		return redirect()->route('list')->with('success', '単語帳への紐づけが変更されました');
	}
	public function selectWordbook()
	{
		$data = $this->showWordbookSelectionFormUseCase->execute();
		return view('admin.select-wordbook', $data);
	}

	public function create()
	{
		$data = $this->showWordCreateFormUseCase->execute();
		return view('admin.create', $data);
	}
	public function store(AdminRequest $request)
	{
		$wordData = [
			'english' => $request->english,
			'japanese' => $request->japanese,
			'part_of_speech' => $request->part_of_speech,
		];
		$wordbookId = $request->input('wordbook_id');
		$order = $request->input('order');
		$this->createWordUseCase->execute($wordData, $wordbookId, $order);
		return redirect()->route('create', ['wordbook_id' => $wordbookId])->with('success', '単語を追加しました');
	}
	public function add()
	{
		return view('admin.add');
	}
	public function books(WordbookRequest $request)
	{
		$this->createWordbookUseCase->execute($request->all());
		return redirect()->route('list')->with('success', '単語帳を追加しました');
	}
}
