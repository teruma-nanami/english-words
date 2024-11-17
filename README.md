# simpleな英単語クイズ
english-words

## 作成した目的
英単語の学習の際に、毎週テストを行うべきとのアドバイスがあったため作成

## アプリケーションURL
http://english-word.nanami-teruma.com

すでに稼働しているアプリのため、ログインIDやパスワードを教えることはできません。
ローカル環境であれば、自由に確認してもらうことが可能です。
ログイン後の機能としては、単語の追加、単語帳の追加、単語と単語帳の紐づけなどを行うことができます。

## 機能一覧
- 単語一覧表示
- 単語テスト機能

- 単語追加機能
- 単語帳追加機能
- 単語と単語帳の紐づけ機能

## 使用技術(実行環境)

- php 8.2.25
- Laravel 10.48.23
- MySQL 8.0

## テーブル設計
| カラム名   | 型              | PRIMARY KEY | UNIQUE KEY | NOT NULL | FOREIGN KEY |
|------------|-----------------|-------------|------------|----------|--------------|
| ID         | bigint unsigned | ◯           |            | ◯        |              |
| email      | string          |             | ◯          | ◯        |              |
| password   | string          |             |            | ◯        |              |
| created_at | timestamp       |             |            |          |              |
| updated_at | timestamp       |             |            |          |              |



| カラム名   | 型              | PRIMARY KEY | UNIQUE KEY | NOT NULL | FOREIGN KEY |
|------------|-----------------|-------------|------------|----------|--------------|
| ID         | bigint unsigned | ◯           |            | ◯        |              |
| english    | string          |             |            | ◯        |              |
| japanese   | string          |             |            | ◯        |              |
| e_sentence | string          |             |            |          |              |
| j_sentence | string          |             |            |          |              |
| created_at | timestamp       |             |            |          |              |
| updated_at | timestamp       |             |            |          |              |



| カラム名   | 型              | PRIMARY KEY | UNIQUE KEY | NOT NULL | FOREIGN KEY |
|------------|-----------------|-------------|------------|----------|--------------|
| ID         | bigint unsigned | ◯           |            | ◯        |              |
| name       | string          |             |            | ◯        |              |
| created_at | timestamp       |             |            |          |              |
| updated_at | timestamp       |             |            |          |              |


| カラム名     | 型              | PRIMARY KEY | UNIQUE KEY | NOT NULL | FOREIGN KEY           |
|--------------|-----------------|-------------|------------|----------|-----------------------|
| ID           | bigint unsigned | ◯           |            | ◯        |                       |
| wordbook_id  | bigint unsigned |             |            | ◯        | ◯ (参照: wordbooks.id)|
| word_id      | bigint unsigned |             |            | ◯        | ◯ (参照: words.id)    |
| order        | integer         |             |            | ◯        |                       |
| created_at   | timestamp       |             |            |          |                       |
| updated_at   | timestamp       |             |            |          |                       |



## 環境構築

### Dockerビルド

1. git clone git@github.com:teruma-nanami/english-words
1. docker-compose up -d --build

### Laravel環境構築
1. docker-composer exec php bash
1. composer install
1. .env.example ファイルから.envを作成し、環境変数を変更
1. php artisan key:generate
1. php artisan migrate
1. php artisan db:seed
