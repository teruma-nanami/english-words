<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
	use HasFactory;

	protected $fillable = [
		'english',
		'japanese',
		'part_of_speech',
	];

	public function wordbooks()
	{
		return $this->belongsToMany(Wordbook::class, 'wordbook_word')
			->withPivot('order')
			->withTimestamps();
	}
}
