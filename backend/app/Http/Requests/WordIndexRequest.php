<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WordIndexRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'part_of_speech' => 'nullable|in:名詞,動詞,形容詞,副詞,前置詞',
			'wordbook_id' => 'nullable|integer|exists:wordbooks,id',
		];
	}
}
