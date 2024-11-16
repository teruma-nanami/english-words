@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/index.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h1>Words List</h1>
    <a href="{{ route('create') }}">Add New Word</a>
    <a href="{{ route('test') }}">test Word</a>
    <ul>
      @foreach ($words as $word)
        <li>{{ $word->english }} - {{ $word->japanese }}</li>
      @endforeach
    </ul>
  </div>
@endsection
