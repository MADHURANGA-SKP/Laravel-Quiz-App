<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\SurveyQuestions;
use App\Models\SurveyAnswer;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('survey_question_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(SurveyQuestions::class, "survey_question_id");
            $table->foreignIdFor(SurveyAnswer::class, "survey_answer_id");
            $table->text("answer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_question_answers');
    }
};
