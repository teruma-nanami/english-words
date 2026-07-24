<?php

namespace App\Repositories;

use App\Models\Wordbook;
use App\Interfaces\WordbookRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class WordbookRepository implements WordbookRepositoryInterface
{
	public function all(): Collection
	{
		return Wordbook::all();
	}

	public function find(int $id): ?Wordbook
	{
		return Wordbook::find($id);
	}

	public function getRandomWords(Wordbook $wordbook, int $count): Collection
	{
		return $wordbook->words()->with('wordbooks')->inRandomOrder()->limit($count)->get();
	}

	public function getSequentialWords(Wordbook $wordbook, int $startWordId, int $count): Collection
	{
		$startOrder = $wordbook->words()->where('words.id', $startWordId)->first()?->pivot->order;

		return $wordbook->words()
			->with('wordbooks')
			->wherePivot('order', '>=', $startOrder)
			->orderBy('wordbook_word.order')
			->limit($count)
			->get();
	}

	public function create(array $data): Wordbook
	{
		return Wordbook::create($data);
	}

	public function update(Wordbook $wordbook, array $data): Wordbook
	{
		$wordbook->update($data);
		return $wordbook;
	}

	public function delete(Wordbook $wordbook): void
	{
		$wordbook->delete();
	}
}
