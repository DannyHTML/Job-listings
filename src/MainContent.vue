<template>
  <!-- Searchbox -->
  <!-- For now, hidden -->
  <Transition name="fade">
    <div
      class="justify-center border-2 rounded-lg border-none shadow-xl overflow-hidden max-w-7xl w-11/12 m-auto relative -top-8"
      v-if="!isAddItem"
    >
      <div class="relative w-full">
        <input
          class="w-full h-16 pl-4 outline-none"
          type="text"
          name="search"
          id="search"
          autocomplete="off"
        />
        <button
          class="absolute top-1/2 -translate-y-1/2 text-lg capitalize right-0 -translate-x-1/2 text-darkGrayishCyan hover:font-bold decoration-2 hover:cursor-pointer hover:underline hover:underline-offset-4"
          @click="clearSearch"
        >
          clear
        </button>
      </div>
    </div>
  </Transition>
  <!-- End searchbox -->
  <!-- Filtering tags -->
  <div class="flex gap-4 mt-8 ml-28 border-2">
    <div class="flex items-center" v-for="tag in selectedTags" :key="tag">
      <div class="text-primary text-lg p-1 font-bold bg-slate-200">
        {{ tag }}
      </div>
      <div
        class="cursor-pointer rounded-sm bg-primary hover:bg-veryDarkGrayishCyan p-2"
        @click="removeTag(tag)"
      >
        <img class="w-5" src="images/icon-remove.svg" alt="" />
      </div>
      <div class="item-self-end">Clear</div>
    </div>
  </div>
  <!-- End filtering tags -->
  <div
    v-for="item in filteredItems"
    :key="item.id"
    class="relative border-2 border-transparent mt-12 h-64 md:h-44 bg-white max-w-7xl w-11/12 rounded-md m-auto shadow-xl last:mb-12"
    :class="{ 'border-l-4 border-l-primary': item.featured }"
  >
    <div
      class="absolute md:-translate-y-1/2 md:top-1/2 md:translate-x-1/2 top-0 md:left-1 left-0 translate-x-5 -translate-y-1/2"
    >
      <img
        class="h-14 object-cover"
        :src="getImageSrc(item.id)"
        :alt="getImageId(item.id)"
      />
    </div>
    <div class="mt-10 md:ml-28 w-10/12 m-auto">
      <div class="md:flex md:justify-between items-center">
        <div>
          <div class="flex gap-2 items-center mb-2">
            <div class="mr-2 text-primary font-bold">{{ item.company }}</div>

            <div
              class="uppercase bg-primary p-1 rounded-xl text-white"
              v-if="item.new"
            >
              new!
            </div>
            <div
              class="uppercase bg-veryDarkGrayishCyan rounded-xl p-1 text-white"
              v-if="item.featured"
            >
              featured
            </div>
          </div>
          <div
            class="text-black font-bold mb-2 hover:text-primary hover:cursor-pointer md:text-xl"
          >
            {{ item.position }}
          </div>
          <div class="flex gap-8">
            <div>{{ item.postedAt }}</div>
            <div>
              <ul class="list-disc">
                <li>{{ item.contract }}</li>
              </ul>
            </div>
            <div>
              <ul class="list-disc">
                <li>{{ item.location }}</li>
              </ul>
            </div>
          </div>
          <div class="mt-2 mb-2 border-b-2 md:border-b-0"></div>
        </div>
        <div id="tags">
          <div class="flex-wrap gap-4 flex text-primary font-bold">
            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
              @click="toggleTag(item.role)"
            >
              {{ item.role }}
            </div>

            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
              @click="toggleTag(item.level)"
            >
              {{ item.level }}
            </div>

            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
              v-for="language in item.languages"
              :key="language"
              @click="toggleTag(language)"
            >
              {{ language }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import data from "./assets/data.json";

const images = [
  { src: "/images/photosnap.svg", alt: "image 1" },
  { src: "/images/manage.svg", alt: "image 2" },
  { src: "/images/account.svg", alt: "image 3" },
  { src: "/images/myhome.svg", alt: "image 4" },
  { src: "/images/loop-studios.svg", alt: "image 5" },
  { src: "/images/faceit.svg", alt: "image 6" },
  { src: "/images/shortly.svg", alt: "image 7" },
  { src: "/images/insure.svg", alt: "image 8" },
  { src: "/images/eyecam-co.svg", alt: "image 9" },
  { src: "/images/the-air-filter-company.svg", alt: "image 10" },
];

const item = ref(data);
const items = item.value;

const getImageSrc = (id) => {
  const imageIndex = id - 1;
  return images[imageIndex].src;
};

const getImageId = (id) => {
  const imageIndex = id - 1;
  return images[imageIndex].src;
};

const selectJob = ref("");

const clearSearch = () => {
  selectJob.value = "";
};

const isAddItem = ref(true);

const addItem = () => {
  isAddItem.value = !isAddItem.value;
};

// test test test

const selectedTags = ref([]);

// Function to add or remove tags based on selection
const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  addItem();
};

// Function to remove a specific tag
const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
};

// Function to filter items based on selected tags
const filteredItems = computed(() => {
  if (selectedTags.value.length === 0) {
    return items;
  } else {
    return items.filter((item) => {
      return (
        selectedTags.value.includes(item.role) ||
        selectedTags.value.includes(item.level) ||
        item.languages.some((language) => selectedTags.value.includes(language))
      );
    });
  }
});
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
</style>
