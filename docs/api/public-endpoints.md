# 公開系APIエンドポイント

対象Issue: #10

## 共通仕様

- 認証：不要（未認証でアクセス可能）
- レスポンスは`data`キーでラップする
- 一覧は`Illuminate\Http\Resources\Json\JsonResource`のResourceクラスで整形する
- ページネーションが発生する一覧は、Laravel標準のページネーション形式（`data` / `links` / `meta`）に従う
- バリデーションエラーは`422`、Laravel標準のエラー形式（`message` / `errors`）で返す

## GET /api/words

単語一覧を取得する。

### Request

パラメータなし。

### Response（200）

```json
{
  "data": [
    {
      "id": 1,
      "english": "apple",
      "japanese": "りんご",
      "part_of_speech": "名詞",
      "order": 1,
      "wordbook_name": "TOEIC基礎"
    }
  ],
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 100,
    "total": 1
  }
}
```

単語がどの単語帳にも紐付いていない場合、`order`・`wordbook_name`は`null`になる。

## GET /api/wordbooks

単語帳一覧を取得する（テスト用の単語帳選択に使用）。

### Request

パラメータなし。

### Response（200）

```json
{
  "data": [
    {
      "id": 1,
      "name": "TOEIC基礎"
    }
  ]
}
```

## GET /api/test

指定した単語帳・出題数に基づき、ランダムに出題する単語を取得する。

### Request

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| `wordbook_id` | integer | 必須 | 出題対象の単語帳ID（`wordbooks`テーブルに存在すること） |
| `count` | integer | 必須 | 出題数（1以上） |

### Response（200）

```json
{
  "data": {
    "wordbook": {
      "id": 1,
      "name": "TOEIC基礎"
    },
    "words": [
      {
        "id": 1,
        "english": "apple",
        "japanese": "りんご",
        "part_of_speech": "名詞"
      }
    ]
  }
}
```

### Response（422、バリデーションエラー）

```json
{
  "message": "The wordbook id field is required. (and 1 more error)",
  "errors": {
    "wordbook_id": ["単語帳の選択は必須です。"],
    "count": ["出題数の入力は必須です。"]
  }
}
```
