<template>
  <PageComponent>
    <template vv-slot:header>
      <div class="flex item-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create a survey" }}
        </h1>
      </div>
    </template>
    <!-- <pre>{{ model }}</pre> -->
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 ng-white space-y-6 sm:p-6">
          <!-- image-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image"
                :src="model.image"
                :alt="model.title"
                class="w-64 h-48 mr-2 object-cover rounded-md"
              />
              <span
                v-else
                class="flex item-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-[80%] w-[80%] text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <!-- change 
              absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer -->
                <input type="file" class="" />
              </button>
            </div>
          </div>
          <!-- title-->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
            <input
              type="text"
              name="title"
              id="title"
              v-model="model.title"
              autocomplete="survey_title"
              class="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <!-- description-->
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                name="description"
                row="3"
                v-model="model.description"
                autocomplete="survey_description"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe your Survey"
              ></textarea>
            </div>
          </div>
          <!-- expire date-->
          <div>
            <label
              for="expire_date"
              class="block text-sm font-medium text-gray-700"
            >
              Expire Date
            </label>
            <input
              type="date"
              name="expire_date"
              id="expire_date"
              v-model="expire_date"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          <!-- status-->
          <div class="flex item-start">
            <div class="flex item-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300 border rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>
          <!-- Survey fields-->
          <div class="px-4 py-5 bg-white xpace-y-6 sm:p-6">
            <h3
              class="text-2xl font-semibold flex items-center mb-5 justify-between"
            >
              Questions
              <button
                class="flex item-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                type="butoon"
                @click="addQuestion()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                Add Questions
              </button>
            </h3>
            <div
              v-if="!model.questions.length"
              class="text-center text-gray-600"
            >
              You've no questions created
            </div>
            <div
              v-for="(question, index) in model.questions"
              :key="question.id"
              class=""
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>
          <!-- save-->
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
import { ref } from "vue";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();
//create an empty survey
let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  questions: [],
});

if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return question;
    }
  });
}
</script>

<style></style>
