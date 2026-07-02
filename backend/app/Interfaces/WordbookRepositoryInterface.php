<?php

namespace App\Interfaces;

use App\Models\Wordbook;
use Illuminate\Database\Eloquent\Collection;

interface WordbookRepositoryInterface
{
	public function all(): Collection;

	public function find(int $id): ?Wordbook;

	public function getRandomWords(Wordbook $wordbook, int $count): Collection;

	public function create(array $data): Wordbook;
}
