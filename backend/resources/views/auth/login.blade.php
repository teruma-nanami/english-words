@extends('layouts.app')

@section('css')
  <link rel="stylesheet" href="{{ asset('css/login.css') }}" />
@endsection

@section('content')
  <div class="container">
    <h2>ログイン</h2>
    <p>
      ログインできるのは管理人のみとなっております。
      あらかじめご了承くださいませ。
    </p>
    <form action="/login" method="post" class="form">
      @csrf
      <div class="form__inner">
        <div class="form__inner-text">
          <label for="email">メールアドレス
            <input type="text" name="email" placeholder="メールアドレス"></label>
        </div>
        @error('email')
          <div class="form__error">{{ $message }}</div>
        @enderror
        <div class="form__inner-text">
          <label for="password">パスワード
            <input type="password" name="password" placeholder="Password"></label>
        </div>
        @error('password')
          <div class="form__error">{{ $message }}</div>
        @enderror
        <div class="form__button">
          <button type="submit">ログインする</button>
        </div>
      </div>
    </form>
  </div>
@endsection
