@foreach ($words as $word)
  <div class="word" data-english="{{ $word->english }}" data-japanese="{{ $word->japanese }}"></div>
@endforeach
