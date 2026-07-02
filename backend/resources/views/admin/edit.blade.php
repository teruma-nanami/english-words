@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>単語の編集</h2>
    <form action="{{ route('update', $word->id) }}" method="POST">
      @csrf
      @method('PUT')
      <!-- 単語帳と順序の選択 -->
      <div class="inner__text">
        <label for="wordbook">単語帳を選択：</label> <select name="wordbook_id" id="wordbook">
          @foreach ($wordbooks as $wordbook)
            <option value="{{ $wordbook->id }}" {{ $currentWordbookId == $wordbook->id ? 'selected' : '' }}>
              {{ $wordbook->name }}
            </option>
          @endforeach
        </select>
      </div>
      <div class="inner__text">
        <label for="order">Order:</label>
        <input type="number" name="order" id="order" value="{{ old('order', $currentOrder) }}">
      </div>
      <!-- 単語の詳細情報 -->
      <div class="inner__text">
        <label for="english">英単語</label>
        <input type="text" name="english" id="english" value="{{ $word->english }}" required>
      </div>
      <div class="inner__text">
        <label for="japanese">日本語</label>
        <input type="text" name="japanese" id="japanese" value="{{ $word->japanese }}" required>
      </div>
      <div class="inner__text">
        <span>品詞：</span>
        <label for="part_of_speech_noun">名詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_noun" value="名詞" {{ $word->part_of_speech == '名詞' ? 'checked' : '' }} required>
        <label for="part_of_speech_verb">動詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_verb" value="動詞" {{ $word->part_of_speech == '動詞' ? 'checked' : '' }} required>
        <label for="part_of_speech_adjective">形容詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_adjective" value="形容詞" {{ $word->part_of_speech == '形容詞' ? 'checked' : '' }} required>
        <label for="part_of_speech_adverb">副詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_adverb" value="副詞" {{ $word->part_of_speech == '副詞' ? 'checked' : '' }} required>
        <label for="part_of_speech_preposition">前置詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_preposition" value="前置詞" {{ $word->part_of_speech == '前置詞' ? 'checked' : '' }} required>
      </div>

      <div class="test__inner">
        <button type="submit">更新</button>
      </div>
    </form>
  </div>
@endsection
