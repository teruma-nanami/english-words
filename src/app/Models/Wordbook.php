<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wordbook extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
	];

	public function words()
	{
		return $this->belongsToMany(Word::class, 'wordbook_word')
			->withPivot('order')
			->withTimestamps();
	}
}
