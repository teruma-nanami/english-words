<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WordResource extends JsonResource
{
	/**
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		$wordbookId = $request->query('wordbook_id');
		$wordbook = $wordbookId
			? $this->wordbooks->firstWhere('id', (int) $wordbookId)
			: $this->wordbooks->first();

		return [
			'id' => $this->id,
			'english' => $this->english,
			'japanese' => $this->japanese,
			'part_of_speech' => $this->part_of_speech,
			'order' => $wordbook?->pivot->order,
			'wordbook_name' => $wordbook?->name,
		];
	}
}
