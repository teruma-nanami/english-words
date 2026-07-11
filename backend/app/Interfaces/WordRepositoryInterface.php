<?php

namespace App\Interfaces;

use App\Models\Word;
use Illuminate\Pagination\LengthAwarePaginator;

interface WordRepositoryInterface
{
	public function paginate(int $perPage, ?string $partOfSpeech = null, ?int $wordbookId = null, ?string $keyword = null): LengthAwarePaginator;

	public function find(int $id): ?Word;

	public function update(Word $word, array $data): Word;

	public function firstOrCreate(array $attributes): Word;

	public function attachWordbook(Word $word, int $wordbookId, int $order): void;

	public function syncWordbookWithoutDetaching(Word $word, int $wordbookId, int $order): void;

	public function delete(Word $word): void;
}
