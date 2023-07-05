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
          v-model="selectJob"
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
  <div
    v-for="item in items"
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
        <div>
          <div class="flex-wrap gap-4 flex text-primary font-bold">
            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
              @click="addItem"
            >
              {{ item.role }}
            </div>

            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
            >
              {{ item.level }}
            </div>

            <div
              class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary"
              v-for="language in item.languages"
              :key="language"
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
import { ref } from "vue";
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
