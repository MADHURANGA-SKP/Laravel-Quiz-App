import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "Sample 1",
    slug: "sample-content-for-the-sueveys",
    status: "draft",
    image:
      "https://a0.muscache.com/im/pictures/871c4b69-808e-4039-9b70-ef54be27d3bb.jpg?im_w=1440",
    description:
      "My name is pasan madhuranga. And I'm a trainee fullstack developer with 1 year experience",
    created_at: "2023-12-14",
    updated_at: "2023-12-14",
    expire_date: "2023-12-31",
    questions: [
      {
        id: 1,
        type: "select",
        question: "which county are you from .?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis;",
        data: {
          option: [
            { uuid: "68cd5791-c439-4a46-87d6-8d3a62775c2e", text: "USA" },
            { uuid: "d432942f-59b4-4e0c-a3f7-3464e109c069", text: "India" },
            { uuid: "04792f3c-931d-4865-8f44-78f188700835", text: "UK" },
            { uuid: "aa76ec41-9741-4071-a90b-46162040b512", text: "SriLanka" },
          ],
        },
      },
      {
        id: 2,
        type: "radio",
        question: "What are your favorite sports?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis;",
        data: {
          option: [
            { uuid: "9372fdd1-7573-44b1-a769-a299832be95f", text: "Football" },
            {
              uuid: "283942b7-1f47-4232-8b9a-e27f4e05d32c",
              text: "Basketball",
            },
            { uuid: "01d37a4f-e945-43b2-9734-c619872739f2", text: "Tennis" },
            { uuid: "4b562381-6723-4f04-a40b-183d0f76b721", text: "Swimming" },
            { uuid: "6e2f923c-a057-4f19-a58c-94721ef12009", text: "Cricket" },
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question: "What kind of music do you enjoy listening to.?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis;",
        data: {
          option: [
            { uuid: "a49821fb-b321-4357-9765-2e39f273b84a", text: "Pop" },
            { uuid: "5c74213b-8d9a-4a01-852d-2e7f046210c3", text: "Rock" },
            { uuid: "12f3987a-4561-4b0e-890a-7239e1f0472d", text: "Hip-Hop" },
            { uuid: "3f62109b-e574-4638-a23f-09b72e37f942", text: "Classical" },
            {
              uuid: "7e59d38c-2b01-4925-a2f7-8103942f7b15",
              text: "Electronic",
            },
          ],
        },
      },
      {
        id: 4,
        type: "text",
        question: "what is the most searched music artist of alltime.?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis;",
        data: {},
      },
      {
        id: 5,
        type: "textarea",
        question:
          "what is the record that Grand Teft Auto V held in when its relesed.?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis;",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "Sample 2 ",
    slug: "sample-content-for-the-sueveys",
    status: "active",
    image:
      "https://a0.muscache.com/im/pictures/871c4b69-808e-4039-9b70-ef54be27d3bb.jpg?im_w=1440",
    description:
      "My name is pasan madhuranga. And I'm a trainee fullstack developer with 1 year experience",
    created_at: "2023-12-14",
    updated_at: "2023-12-14",
    expire_date: "2023-12-31",
    questions: [],
  },

  {
    id: 300,
    title: "Sample 3 ",
    slug: "sample-content-for-the-sueveys",
    status: "active",
    image:
      "https://a0.muscache.com/im/pictures/871c4b69-808e-4039-9b70-ef54be27d3bb.jpg?im_w=1440",
    description:
      "My name is pasan madhuranga. And I'm a trainee fullstack developer with 1 year experience",
    created_at: "2023-12-14",
    updated_at: "2023-12-14",
    expire_date: "2023-12-31",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }, user) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
