<?php

namespace App\Repositories;

use App\Models\Word;
use App\Interfaces\WordRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class WordRepository implements WordRepositoryInterface
{
	public function paginate(int $perPage): LengthAwarePaginator
	{
		return Word::paginate($perPage);
	}

	public function find(int $id): ?Word
	{
		return Word::find($id);
	}

	public function update(Word $word, array $data): Word
	{
		$word->update($data);
		return $word;
	}

	public function firstOrCreate(array $attributes): Word
	{
		return Word::firstOrCreate($attributes);
	}

	public function attachWordbook(Word $word, int $wordbookId, int $order): void
	{
		$word->wordbooks()->attach($wordbookId, ['order' => $order]);
	}

	public function syncWordbookWithoutDetaching(Word $word, int $wordbookId, int $order): void
	{
		$word->wordbooks()->syncWithoutDetaching([$wordbookId => ['order' => $order]]);
	}
}
