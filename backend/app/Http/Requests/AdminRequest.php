<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
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
			'english' => 'required|string|max:255',
			'japanese' => 'required|string|max:255',
			'part_of_speech' => 'required|in:名詞,動詞,形容詞,副詞,前置詞',
			'wordbook_id' => 'required|integer|exists:wordbooks,id',
			'order' => 'required|integer|min:1',
		];
	}

	public function messages()
	{
		return [
			'english.required' => '英単語は必須です。',
			'japanese.required' => '日本語訳は必須です。',
			'part_of_speech.required' => '品詞の選択は必須です。',
			'wordbook_id.required' => '単語帳の選択は必須です。',
			'order.required' => '順序は必須です。',
			'order.min' => '順序は1以上である必要があります。',
		];
	}
}
