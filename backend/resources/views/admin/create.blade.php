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
            <option value="{{ $wordbook->id }}">{{ $wordbook->name }}</option>
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
        <label for="e_sentence">英文　</label>
        <input type="text" name="e_sentence" id="e_sentence">
      </div>
      <div class="inner__text">
        <label for="j_sentence">日本文</label>
        <input type="text" name="j_sentence" id="j_sentence">
      </div>
      <div class="test__inner">
        <button type="submit">追加</button>
      </div>
    </form>
  @endsection
