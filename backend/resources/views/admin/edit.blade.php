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
        <input type="number" name="order" id="order" value="{{ old('order', $currentOrder) }}" required>
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
        <label for="e_sentence">英文　</label>
        <input type="text" name="e_sentence" id="e_sentence" value="{{ $word->e_sentence }}">
      </div>
      <div class="inner__text">
        <label for="j_sentence">日本文</label>
        <input type="text" name="j_sentence" id="j_sentence" value="{{ $word->j_sentence }}">
      </div>

      <div class="test__inner">
        <button type="submit">更新</button>
      </div>
    </form>
  </div>
@endsection
