<template>
  <!-- Filter -->
  <!-- Hidden at first -->
  <Transition name="fade">
    <div
      class="z-50 flex-wrap bg-white flex rounded-lg max-w-7xl w-11/12 m-auto shadow-xl relative -top-8"
      v-if="isAddItem"
    >
      <TransitionGroup name="fade">
        <div class="flex p-4" v-for="tag in selectedTags" :key="tag">
          <div
            class="text-primary lg:text-lg p-1 lg:font-bold bg-slate-200 flex"
          >
            {{ tag }}
          </div>
          <div
            class="cursor-pointer rounded-sm bg-primary hover:bg-veryDarkGrayishCyan p-2 duration-300"
            @click="removeTag(tag)"
          >
            <img class="lg:w-5" src="/images/icon-remove.svg" alt="" />
          </div>
          <div
            class="absolute right-0 -translate-x-6 top-1/2 -translate-y-1/2 cursor-pointer"
            @click="removeTagAll"
          >
            <span
              class="text-xl hover:underline text-primary hover:underline-offset-2"
              >Clear</span
            >
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Transition>
  <TransitionGroup name="slide">
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
              <div class="mr-2 text-primary font-bold">
                {{ item.company }}
              </div>

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
              class="text-black font-bold mb-2 hover:text-primary hover:cursor-pointer md:text-xl duration-300"
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
                class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary duration-300"
                @click="toggleTag(item.role)"
              >
                {{ item.role }}
              </div>
              <div
                class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary duration-300"
                @click="toggleTag(item.level)"
              >
                {{ item.level }}
              </div>

              <div
                class="bg-filterTabs p-1 rounded-md cursor-pointer hover:text-white hover:bg-primary duration-300"
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
  </TransitionGroup>
</template>

<script setup>
import { computed, ref } from "vue";
import data from "./assets/data.json";

// This will give you acces to the json file date and gives you acces to the item's values inside the json file show you can work with it in your template.

const item = ref(data);
const items = item.value;

const images = [
  { src: "./images/photosnap.svg", alt: "image 1" },
  { src: "./images/manage.svg", alt: "image 2" },
  { src: "./images/account.svg", alt: "image 3" },
  { src: "./images/myhome.svg", alt: "image 4" },
  { src: "./images/loop-studios.svg", alt: "image 5" },
  { src: "./images/faceit.svg", alt: "image 6" },
  { src: "./images/shortly.svg", alt: "image 7" },
  { src: "./images/insure.svg", alt: "image 8" },
  { src: "./images/eyecam-co.svg", alt: "image 9" },
  { src: "./images/the-air-filter-company.svg", alt: "image 10" },
];

// This function will show the correct image in the correct item(div's with jobs) by using id and index.
// Using -1 so the values starts from 1 and not 0.

const getImageSrc = (id) => {
  const imageIndex = id - 1;
  return images[imageIndex].src;
};

// This function will show the correct alt-tag in the correct item(div's with jobs) by using id and index.
// Using -1 so the values/index starts from 1 and not 0.

const getImageId = (id) => {
  const imageIndex = id - 1;
  return images[imageIndex].src;
};

//  This variable and funtion makes sure the filter is hidden by default, but when a tag is being selected it will show
// When no filter array is empty, it will be hidden again.

const isAddItem = ref(false);

const addItem = () => {
  isAddItem.value = true;
};

// This funtion adds the tag being clicked to the filter which will only appear while atleast 1 tag is active.

const selectedTags = ref([]);

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  // Makes the filter comes up with the selected tag/tags
  addItem();
};

// This funtion removes the tag being clicked from the filter. Once no tags left, the filter goes hidden.

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  // <= so it does the animation when there is only one left, otherwise it removes them all
  if (selectedTags.value <= 1) {
    isAddItem.value = false;
  }
};

// This funtion removes all the tags while being clicked from the filter.The filter goes hidden.

const removeTagAll = () => {
  selectedTags.value = [];
  // Makes the transition fade out when clicked on Clear btn
  isAddItem.value = false;
};

// This function first checks if there is anything to filter, while there aren't any tags active it will show all items(div's with jobs).
// If atleast 1 or more tag(s) is/are actived it will look up what kind of item it is and will filter through the list and only show the items(div's with jobs) with the tag inside.
// This way you can easily look for a job with the tag you selected.

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

// const filteredItems = computed(() => {
//   if (selectedTags.value.length === 0) {
//     return items;
//   } else {
//     return items.filter((item) => {
//       const role = selectedTags.value.includes(item.role);
//       const level = selectedTags.value.includes(item.level);
//       const language = item.languages.some((language) =>
//         selectedTags.value.includes(language)
//       );

//       if (role && level && language) {
//         return item;
//       }
//       if (role && level) {
//         return item;
//       }
//       if (level && language) {
//         return item;
//       }
//       if (role) {
//         return item;
//       }
//       if (level) {
//         return item;
//       }
//       if (language) {
//         return item;
//       }
//     });
//   }
// });

// const test = [item.level && item.role];
// const test2 = [item.level && item.languages];
// const test3 = [item.role && item.languages];
// const test4 = [item.level && item.role && item.languages];

// const filteredItems = computed(() => {
//   if (selectedTags.value.length === 0) {
//     return items;
//   } else {
//     return items.filter((item) => {
//       if (
//         selectedTags.value.includes(item.role) &&
//         selectedTags.value.includes(item.level)
//       ) {
//         return test;
//       }
//       if (
//         selectedTags.value.includes(item.level) &&
//         item.languages.some((language) => selectedTags.value.includes(language))
//       ) {
//         return test2;
//       }
//       if (
//         selectedTags.value.includes(item.role) &&
//         item.languages.some((language) => selectedTags.value.includes(language))
//       ) {
//         return test3;
//       }
//       if (
//         selectedTags.value.includes(item.role) &&
//         selectedTags.value.includes(item.level) &&
//         item.languages.some((language) => selectedTags.value.includes(language))
//       ) {
//         return test4;
//       }

//       if (selectedTags.value.includes(item.role)) {
//         return item;
//       }
//       if (selectedTags.value.includes(item.level)) {
//         return item;
//       }
//       if (
//         item.languages.some((language) => selectedTags.value.includes(language))
//       ) {
//         return item;
//       }
//     });
//   }
// });
</script>

<style scoped>
/* Fade transition */
.fade-move,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

/* Slide transition */

.slide-enter-from {
  transform: translateX(120%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-120%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

/* End slide transition */
</style>
