<template>
  <!-- Searchbox -->
  <!-- For now, hidden -->
  <div
    class="hidden justify-center border-2 rounded-lg border-none shadow-xl overflow-hidden max-w-7xl w-11/12 m-auto relative -top-8"
  >
    <div class="relative w-full">
      <input class="w-full h-16" type="search" name="" id="" />
      <button
        class="absolute top-1/2 -translate-y-1/2 capitalize right-0 -translate-x-1/2 text-darkGrayishCyan font-bold"
      >
        clear
      </button>
    </div>
  </div>
  <!-- End searchbox -->
  <div
    class="relative border-2 mt-12 h-56 md:h-44 bg-white border-transparent max-w-7xl w-11/12 rounded-md m-auto shadow-xl"
  >
    <div
      class="absolute md:-translate-y-1/2 md:top-1/2 md:translate-x-1/2 top-0 md:left-1 left-0 translate-x-5 -translate-y-1/2"
    >
      <img
        class="h-14 object-cover"
        :src="currentImage"
        :alt="currentImageAlt"
      />
    </div>
    <div class="mt-10 md:ml-28 w-10/12 m-auto">
      <div v-for="item in items" :key="item.id">
        <div class="md:flex md:justify-between items-center">
          <div>
            <div class="flex gap-1 items-center mb-2">
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
            <div class="text-black font-bold mb-2">
              {{ item.position }}
            </div>
            <div class="flex gap-8">
              <div>{{ item.postedAt }}</div>
              <div class="">
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
            <div class="flex flex-wrap gap-2">
              <div>{{ item.role }}</div>
              <div>{{ item.level }}</div>
              <div v-for="language in item.languages">
                {{ language }}
              </div>
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

const currentIndex = ref(0);
const images = [
  { src: "/images/photosnap.svg", alt: "image 1" },
  { src: "/images/manage.svg", alt: "image 2" },
  { src: "/images/account.svg", alt: "image 3" },
  { src: "/images/myhome.svg", alt: "image 4" },
  { src: "/images/loop-studios.svg", alt: "image 5" },
  { src: "/images/faceit.svg", alt: "image 6" },
  { src: "/images/shortly.svg", alt: "image 7" },
  { src: "/images/insure.svg", alt: "image 8" },
  { src: "/images/eyecam.svg", alt: "image 9" },
  { src: "/images/the-air-filter-company.svg", alt: "image 10" },
];

const currentImage = computed(() => images[currentIndex.value].src);
const currentImageAlt = computed(() => images[currentIndex.value].alt);

const item = ref(data);
const items = item.value;

// new and featured values and booleans
</script>

<style scoped></style>
