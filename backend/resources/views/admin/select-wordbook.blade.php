@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>単語帳を選択</h2>
    @if ($wordbooks->isEmpty())
      <p>単語帳がありません。<a href="{{ route('add') }}">単語帳を追加する</a></p>
    @else
      <ul>
        @foreach ($wordbooks as $wordbook)
          <li>
            <a href="{{ route('create', ['wordbook_id' => $wordbook->id]) }}">{{ $wordbook->name }}</a>
          </li>
        @endforeach
      </ul>
    @endif
  </div>
@endsection
