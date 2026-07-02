@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>単語の追加</h2>
    <form action="{{ route('store') }}" method="POST">
      @csrf
      <div class="inner__text">
        <label for="wordbook">単語帳を選択：</label>
        <select name="wordbook_id" id="wordbook">
          @foreach ($wordbooks as $wordbook)
            <option value="{{ $wordbook->id }}" {{ request('wordbook_id') == $wordbook->id ? 'selected' : '' }}>{{ $wordbook->name }}</option>
          @endforeach
        </select>
      </div>
      <div class="inner__text">
        <label for="order">Order:</label>
        <input type="number" name="order" id="order" required>
      </div>
      <div class="inner__text">
        <label for="english">英単語</label>
        <input type="text" name="english" id="english" required>
      </div>
      <div class="inner__text">
        <label for="japanese">日本語</label>
        <input type="text" name="japanese" id="japanese" required>
      </div>
      <div class="inner__text">
        <span>品詞：</span>
        <label for="part_of_speech_noun">名詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_noun" value="名詞" required>
        <label for="part_of_speech_verb">動詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_verb" value="動詞" required>
        <label for="part_of_speech_adjective">形容詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_adjective" value="形容詞" required>
        <label for="part_of_speech_adverb">副詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_adverb" value="副詞" required>
        <label for="part_of_speech_preposition">前置詞</label>
        <input type="radio" name="part_of_speech" id="part_of_speech_preposition" value="前置詞" required>
      </div>
      <div class="test__inner">
        <button type="submit">追加</button>
      </div>
    </form>
  @endsection
