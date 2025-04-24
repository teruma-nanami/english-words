<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordbookWord extends Model
{
	use HasFactory;
	protected $table = 'wordbook_word';
	protected $fillable = [
		'wordbook_id',
		'word_id',
		'order'
	];
}
