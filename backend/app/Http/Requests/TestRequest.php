<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestRequest extends FormRequest
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
			'wordbook_id' => 'required|integer|exists:wordbooks,id',
			'count' => 'required|integer|min:1',
			'mode' => 'required|in:random,sequential',
			'start_word_id' => 'required_if:mode,sequential|integer|exists:words,id',
		];
	}

	public function messages()
	{
		return [
			'wordbook_id.required' => '単語帳の選択は必須です。',
			'wordbook_id.exists' => '選択した単語帳が存在しません。',
			'count.required' => '出題数の入力は必須です。',
			'count.min' => '出題数は1以上である必要があります。',
			'mode.required' => '出題モードの選択は必須です。',
			'mode.in' => '出題モードの値が不正です。',
			'start_word_id.required_if' => '開始位置の選択は必須です。',
			'start_word_id.exists' => '選択した単語が存在しません。',
		];
	}
}
