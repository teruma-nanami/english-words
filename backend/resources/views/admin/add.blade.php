@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>単語帳の追加</h2>
    <form action="{{ route('books') }}" method="POST">
      @csrf
      <div class="inner__text">
        <label for="name">タイトル：</label>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="test__inner">
        <button type="submit">追加</button>
      </div>
    </form>
  </div>
@endsection
