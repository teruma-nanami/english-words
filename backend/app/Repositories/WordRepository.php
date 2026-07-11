<?php

namespace App\Repositories;

use App\Models\Word;
use App\Interfaces\WordRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class WordRepository implements WordRepositoryInterface
{
	public function paginate(int $perPage, ?string $partOfSpeech = null, ?int $wordbookId = null, ?string $keyword = null): LengthAwarePaginator
	{
		return Word::with('wordbooks')
			->when($partOfSpeech, fn ($query) => $query->where('part_of_speech', $partOfSpeech))
			->when($wordbookId, fn ($query) => $query->whereHas('wordbooks', fn ($q) => $q->where('wordbooks.id', $wordbookId)))
			->when($keyword, fn ($query) => $query->where('english', 'like', '%'.$keyword.'%'))
			->paginate($perPage);
	}

	public function find(int $id): ?Word
	{
		return Word::with('wordbooks')->find($id);
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

	public function delete(Word $word): void
	{
		$word->delete();
	}
}
