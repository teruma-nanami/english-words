<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('words', function (Blueprint $table) {
            $table->dropColumn(['e_sentence', 'j_sentence']);
            $table->enum('part_of_speech', ['名詞', '動詞', '形容詞', '副詞', '前置詞'])->after('japanese');
        });

        Schema::table('wordbook_word', function (Blueprint $table) {
            $table->integer('order')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('wordbook_word', function (Blueprint $table) {
            $table->integer('order')->nullable(false)->change();
        });

        Schema::table('words', function (Blueprint $table) {
            $table->dropColumn('part_of_speech');
            $table->string('e_sentence')->nullable();
            $table->string('j_sentence')->nullable();
        });
    }
};
